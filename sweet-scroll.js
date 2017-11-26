/*!
 * sweet-scroll
 * Modern and the sweet smooth scroll library.
 *
 * @author tsuyoshiwada
 * @license MIT
 * @version 2.2.1
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.SweetScroll = factory());
}(this, (function () { 'use strict';

var SweetScroll = /** @class */ (function () {
    function SweetScroll() {
    }
    return SweetScroll;
}());

// import { canUseDOM } from './utils/supports';
// import * as Lang from './utils/lang';
// import { $, findScrollable } from './dom/selectors';
//
// export default class SweetScroll {
//   // Default options
//   /* eslint-disable max-len */
//   static defaults = {
//     trigger: '[data-scroll]', // Selector for trigger (must be a valid css selector)
//     header: '[data-scroll-header]', // Selector for fixed header (must be a valid css selector)
//     duration: 1000, // Specifies animation duration in integer
//     delay: 0, // Specifies timer for delaying the execution of the scroll in milliseconds
//     easing: 'easeOutQuint', // Specifies the pattern of easing
//     offset: 0, // Specifies the value to offset the scroll position in pixels
//     verticalScroll: true, // Enable the vertical scroll
//     horizontalScroll: false, // Enable the horizontal scroll
//     stopScroll: true, // When fired wheel or touchstart events to stop scrolling
//     updateURL: false, // Update the URL hash on after scroll (true | false | "push" | "replace")
//     preventDefault: true, // Cancels the container element click event
//     stopPropagation: true, // Prevents further propagation of the container element click event in the bubbling phase
//     outputLog: false, // Specify level of output to log
//     quickMode: false, // Instantly scroll to the destination! (It's recommended to use it with `easeOutExpo`)
//
//     // Callbacks
//     beforeScroll: null,
//     afterScroll: null,
//     cancelScroll: null,
//     completeScroll: null,
//     stepScroll: null,
//   };
//   /* eslint-enable max-len */
//
//   /**
//    * @constructor
//    * @param {Object}           options
//    * @param {string | Element} container
//    */
//   constructor(options = {}, container = 'body, html') {
//     this.options = Lang.merge(SweetScroll.defaults, options);
//     this.$container = this.findContainer(container);
//     this.$header = null;
//
//     if (this.$container == null) {
//       if (canUseDOM) {
//         if (!/comp|inter|loaded/.test(document.readyState)) {
//           this.log('Should be initialize later than DOMContentLoaded.');
//         } else {
//           this.log(`Not found scrollable container: '${container}'`);
//         }
//       }
//     } else {
//       this.$header = $(this.options.header);
//     }
//   }
//
//   /**
//    * Output log
//    *
//    * @private
//    * @param  {String} message
//    * @return {void}
//    */
//   log(message) {
//     if (this.options.outputLog) {
//       warning();
//     }
//   }
//
//   /**
//    * Get the container for the scroll, depending on the options.
//    *
//    * @private
//    * @param  {string | Element} selector
//    * @return {Element}
//    */
//   findContainer(selector) {
//     const { verticalScroll, horizontalScroll } = this.options;
//     let container = null;
//
//     if (canUseDOM) return container;
//
//     if (verticalScroll) {
//       container = findScrollable(selector, 'y');
//     }
//
//     if (!container && horizontalScroll) {
//       container = findScrollable(selector, 'x');
//     }
//
//     return container;
//   }
// }

return SweetScroll;

})));
