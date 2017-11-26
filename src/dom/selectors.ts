import { directionMethodMap, Direction } from './offsets';

export const $$ = (selector: string, context: Element | null = null): Element[] => (
  [...((!selector ? [] : (context == null ? document : context).querySelectorAll(selector)) as Element[])]
);

export const $ = (selector: string, context: Element | null = null): Element | null => (
  !selector ? null : (context == null ? document : context).querySelector(selector)
);

export const matches = ($el: Element, selector: string | Element): boolean => {
  if (selector instanceof Element) {
    return $el === selector;
  }

  const results = $$(selector, ($el as any).document || $el.ownerDocument);
  let i = results.length;
  // tslint:disable-next-line no-empty
  while (--i >= 0 && results[i] !== $el) {}
  return i > -1;
};

export const isRootContainer = ($el: Element): boolean => (
  $el === document.documentElement || $el === document.body
);

export const getWindow = ($el: Element | Window): Window | null => (
  ($el != null && $el === ($el as any).window) ? $el : ($el as any).nodeType === 9 && ($el as any).defaultView
);

const getZoomLevel = (): number => {
  const { outerWidth, innerWidth } = window;

  return outerWidth ? outerWidth / innerWidth : 1;
};

export const findScrollable = (selectors: string | Element, direction: Direction): Element | null => {
  const method = directionMethodMap[direction];
  const $elements = selectors instanceof Element ? [selectors] : $$(selectors);
  const $div = document.createElement('div');

  for (let i = 0; i < $elements.length; i += 1) {
    const $el = $elements[i];
    let $result = null;

    if ($el[method] > 0) {
      $result = $el;
    } else {
      $div.style.width = `${$el.clientWidth + 1}px`;
      $div.style.height = `${$el.clientHeight + 1}px`;
      $el.appendChild($div);
      $el[method] = 1.5 / getZoomLevel();
      if ($el[method] > 0) {
        $result = $el;
      }
      $el[method] = 0;
      $el.removeChild($div);
    }

    if ($result) {
      return $result;
    }
  }

  return null;
};
