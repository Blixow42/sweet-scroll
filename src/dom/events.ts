import { canUseDOM } from '../utils/supports';

type EventListener = (e: Event) => void;

const wheelEventName = (() => {
  if (!canUseDOM) {
    return 'wheel';
  }

  if ('onwheel' in document) {
    return 'wheel';
  } else if ('onmousewheel' in document) {
    return 'mousewheel';
  }

  return 'DOMMouseScroll';
})();

const normalizeEventName = (eventName: string): string => {
  switch (eventName) {
    case 'wheel': return wheelEventName;
    default: return eventName.trim();
  }
};

export const addEvent = ($el: Element, event: string, listener: EventListener): void => {
  event.split(' ').forEach((eventName) => {
    $el.addEventListener(normalizeEventName(eventName), listener, false);
  });
};

export const removeEvent = ($el: Element, event: string, listener: EventListener): void => {
  event.split(' ').forEach((eventName) => {
    $el.removeEventListener(normalizeEventName(eventName), listener, false);
  });
};
