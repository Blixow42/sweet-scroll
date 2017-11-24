import { directionMethodMap } from './offsets';

export const $$ = (selector, context = null) => (
  !selector ? [] : (context == null ? document : context).querySelectorAll(selector)
);

export const $ = (selector, context = null) => (
  !selector ? undefined : (context == null ? document : context).querySelector(selector)
);

export const matches = ($el, selector) => {
  const results = $$(selector, $el.document || $el.ownerDocument);
  let i = results.length;
  while (--i >= 0 && results.item(i) !== $el); // eslint-disable-line no-plusplus
  return i > -1;
};

export const isRootContainer = $el => (
  $el === document.documentElement || $el === document.body
);

export const getWindow = $el => (
  ($el != null && $el === $el.window) ? $el : $el.nodeType === 9 && $el.defaultView
);

const getZoomLevel = () => {
  const { outerWidth, innerWidth } = window;

  return outerWidth ? outerWidth / innerWidth : 1;
};

export const findScrollable = (selectors, direction) => {
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
