/* tslint:disable max-line-length */
import { EasingFunction } from './animation/easings';

export interface OptionsInit {
  trigger?: string | Element;
  header?: string | Element;
  duration?: number;
  delay?: number;
  easing?: string | EasingFunction;
  offset?: number;
  verticalScroll?: boolean;
  horizontalScroll?: boolean;
  stopScroll?: boolean;
  updateURL?: boolean;
  preventDefault?: boolean;
  stopPropagation?: boolean;
  outputLog?: boolean;
  quickMode?: boolean;

  beforeScroll?: () => void;
  afterScroll?: () => void;
  cancelScroll?: () => void;
  completeScroll?: () => void;
  stepScroll?: () => void;
}

export interface Options {
  trigger: string | Element;
  header: string | Element;
  duration: number;
  delay: number;
  easing: string | EasingFunction;
  offset: number;
  verticalScroll: boolean;
  horizontalScroll: boolean;
  stopScroll: boolean;
  updateURL: boolean;
  preventDefault: boolean;
  stopPropagation: boolean;
  outputLog: boolean;
  quickMode: boolean;

  beforeScroll: null;
  afterScroll: null;
  cancelScroll: null;
  completeScroll: null;
  stepScroll: null;
}

export const defaultOptions: Options = {
  trigger: '[data-scroll]',       // Selector for trigger (must be a valid css selector)
  header: '[data-scroll-header]', // Selector for fixed header (must be a valid css selector)
  duration: 1000,                 // Specifies animation duration in integer
  delay: 0,                       // Specifies timer for delaying the execution of the scroll in milliseconds
  easing: 'easeOutQuint',         // Specifies the pattern of easing
  offset: 0,                      // Specifies the value to offset the scroll position in pixels
  verticalScroll: true,           // Enable the vertical scroll
  horizontalScroll: false,        // Enable the horizontal scroll
  stopScroll: true,               // When fired wheel or touchstart events to stop scrolling
  updateURL: false,               // Update the URL hash on after scroll (true | false | 'push' | 'replace')
  preventDefault: true,           // Cancels the container element click event
  stopPropagation: true,          // Prevents further propagation of the container element click event in the bubbling phase
  outputLog: false,               // Specify level of output to log
  quickMode: false,               // Instantly scroll to the destination! (It's recommended to use it with `easeOutExpo`)

  // Callbacks
  beforeScroll: null,
  afterScroll: null,
  cancelScroll: null,
  completeScroll: null,
  stepScroll: null,
};
