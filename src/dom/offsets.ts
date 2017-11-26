import { getWindow, isRootContainer } from './selectors';

export type Direction = 'x' | 'y';

export const directionMethodMap = {
  y: 'scrollTop',
  x: 'scrollLeft',
};

export const directionPropMap = {
  y: 'pageYOffset',
  x: 'pageXOffset',
};

export const getScroll = ($el: HTMLElement, direction: Direction): number => {
  const win = getWindow($el);

  return win ? win[directionPropMap[direction]] : $el[directionMethodMap[direction]];
};

export const setScroll = ($el: HTMLElement, offset: number, direction: Direction): void => {
  const win = getWindow($el);
  const top = direction === 'y';

  if (win) {
    win.scrollTo(
      !top ? offset : win[directionPropMap.x],
      top ? offset : win[directionPropMap.y],
    );
  } else {
    $el[directionMethodMap[direction]] = offset;
  }
};

export const getOffset = ($el: HTMLElement, context: HTMLElement | null = null): { top: number, left: number } => {
  const rect = $el.getBoundingClientRect();

  if (rect.width || rect.height) {
    const scroll = { top: 0, left: 0 };
    let ctx = null;

    if (context == null || isRootContainer(context)) {
      ctx = $el.ownerDocument.documentElement;
      scroll.top = window[directionPropMap.y];
      scroll.left = window[directionPropMap.x];
    } else {
      ctx = context;
      const cRect = ctx.getBoundingClientRect();
      scroll.top = (cRect.top * -1) + ctx[directionMethodMap.y];
      scroll.left = (cRect.left * -1) + ctx[directionMethodMap.x];
    }

    return {
      top: (rect.top + scroll.top) - ctx.clientTop,
      left: (rect.left + scroll.left) - ctx.clientLeft,
    };
  }

  return rect;
};
