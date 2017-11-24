import { canUseDOM } from '../utils/supports';

const wheelEventName = (() => {
  if (!canUseDOM) return 'wheel';

  if ('onwheel' in document) {
    return 'wheel';
  } else if ('onmousewheel' in document) {
    return 'mousewheel';
  }

  return 'DOMMouseScroll';
})();

const normalizeEventName = (eventName) => {
  switch (eventName) {
    case 'wheel': return wheelEventName;
    default: return eventName.trim();
  }
};

export const addEvent = ($el, event, listener) => {
  event.split(' ').forEach((eventName) => {
    $el.addEventListener(normalizeEventName(eventName), listener, false);
  });
};

export const removeEvent = ($el, event, listener) => {
  event.split(' ').forEach((eventName) => {
    $el.removeEventListener(normalizeEventName(eventName), listener, false);
  });
};
