import { canUseDOM } from './utils/supports';
import * as Lang from './utils/lang';
import { createLogger, Logger } from './utils/logger';
import { $, findScrollable, matches } from './dom/selectors';
import { addEvent } from './dom/events';
import {
  OptionsInit,
  Options,
  defaultOptions,
} from './options';

interface Context {
  options: Options;
  $trigger: Element | null;
}

export default class SweetScroll {
  private options: Options;
  private logger: Logger;
  private $container: Element | null;
  private $header: Element | null = null;
  private context: Context = {
    $trigger: null,
    options: null,
  };

  /**
   * Constructor
   */
  public constructor(options: OptionsInit = {}, container: string | Element = 'body, html') {
    this.options = (Lang.merge(defaultOptions, options) as Options);
    this.logger = createLogger('SweetScroll', this.options.outputLog);
    this.$container = this.findContainer(container);

    if (this.$container == null) {
      if (canUseDOM) {
        if (!/comp|inter|loaded/.test(document.readyState)) {
          this.logger('Should be initialize after than DOMContentLoaded.');
        } else {
          this.logger(`Not found scrollable container: '${container}'`);
        }
      }
    } else {
      const { header } = this.options;
      this.$header = header instanceof Element ? header : $(header);
      this.bindContainerClick();
    }
  }

  /**
   * Scroll animation to the specified position.
   */
  public to(distance: string | number, options: OptionsInit = {}): void {
    if (!canUseDOM) {
      return;
    }

    const { $container, context, options: currentOptions } = this;
    const { $trigger } = context;
    const opts = (Lang.merge(currentOptions, options) as Options);
    const hash = Lang.isString(distance) && /^#/.test(distance) ? distance : null;

    // Temporary options
    this.context.options = opts;

    // Remove triggering element which has been temporarily retained
    this.context.$trigger = null;

    // // Disable the call flag of `cancelScroll`
    // this._shouldCallCancelScroll = false;

    // Stop current animation
    this.stop();

    // Does not move if the container is not found
    if (!$container) {
      this.logger('Not found container element.');
      return;
    }

    // Get scroll offset
    let scroll = this.getScrollOffset(distance, opts);
  }

  /**
   * Stop the current scroll animation.
   */
  public stop(gotoEnd: boolean = true): void {
  }
  //
  //
  //   // Stop current animation
  //   this.stop();
  //
  //   // Does not move if the container is not found
  //   if (!container) {
  //     return this.log('Not found container element.');
  //   }
  //
  //   // Get scroll offset
  //   let scroll = this.getScrollOffset(distance, params);
  //
  //   if (!scroll) {
  //     return this.log(`Invalid parameter of distance. => ${distance}`);
  //   }
  //
  //   // Call `beforeScroll`
  //   // Stop scrolling when it returns false
  //   if (this.hook(params, 'beforeScroll', scroll, trigger) === false) {
  //     this._options = null;
  //     return;
  //   }
  //
  //   scroll = this.normalizeScrollOffset(scroll, params);
  //
  //   // Run the animation!!
  //   this.tween.run(scroll.left, scroll.top, {
  //     duration: params.duration,
  //     delay: params.delay,
  //     easing: params.easing,
  //     quickMode: params.quickMode,
  //     complete: () => {
  //       // Update URL
  //       if (hash != null && hash !== win.location.hash) {
  //         this.updateURLHash(hash, params.updateURL);
  //       }
  //
  //       // Unbind the scroll stop events, And call `afterScroll` or `cancelScroll`
  //       this.unbindContainerStop();
  //
  //       // Remove the temporary options
  //       this._options = null;
  //
  //       // Call `cancelScroll` or `afterScroll`
  //       if (this._shouldCallCancelScroll) {
  //         this.hook(params, 'cancelScroll');
  //       } else {
  //         this.hook(params, 'afterScroll', scroll, trigger);
  //       }
  //
  //       // Call `completeScroll`
  //       this.hook(params, 'completeScroll', this._shouldCallCancelScroll);
  //     },
  //     step: (currentTime, props) => {
  //       this.hook(params, 'stepScroll', currentTime, props);
  //     },
  //   });
  //
  //   // Bind the scroll stop events
  //   this.bindContainerStop();
  // }

  /**
   * Bind a click event to the container.
   */
  protected bindContainerClick() {
    const { $container } = this;
    if ($container) {
      addEvent($container, 'click', this.handleContainerClick);
    }
  }

  /**
   * Handling of container click event.
   */
  protected handleContainerClick = (e: Event) => {
    const { options } = this;
    let $el: any = (e.target as any);

    for (; $el && $el !== document; $el = $el.parentNode) {
      if (!matches($el, options.trigger)) {
        continue;
      }

      const dataOptions = this.parseDataOptions($el);
      const data = $el.getAttribute('data-scroll');
      const to = data || $el.getAttribute('href');
      const opts = (Lang.merge(options, dataOptions) as Options);

      if (opts.preventDefault) {
        e.preventDefault();
      }

      if (opts.stopPropagation) {
        e.stopPropagation();
      }

      // Passes the trigger element to callback
      this.context.$trigger = $el;

      if (opts.horizontalScroll && opts.verticalScroll) {
        this.to(to, opts);
      } else if (opts.verticalScroll) {
        this.toTop(to, opts);
      } else if (opts.horizontalScroll) {
        this.toLeft(to, opts);
      }
    }
  }

  /**
   * Find the container for the scroll, depending on the options.
   */
  protected findContainer(selector: string | Element): Element | null {
    const { verticalScroll, horizontalScroll } = this.options;
    let container = null;

    if (!canUseDOM) {
      return container;
    }

    if (verticalScroll) {
      container = findScrollable(selector, 'y');
    }

    if (!container && horizontalScroll) {
      container = findScrollable(selector, 'x');
    }

    return container;
  }

  /**
   * Parse the data-scroll-options attribute
   */
  private parseDataOptions($el: Element) {
    const opts = $el.getAttribute('data-scroll-options');
    return opts ? JSON.parse(opts) : {};
  }
}
