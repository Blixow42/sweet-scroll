import { isRootContainer } from './selectors';

const getHeight = $el => (
  Math.max($el.scrollHeight, $el.clientHeight, $el.offsetHeight)
);

const getWidth = $el => (
  Math.max($el.scrollWidth, $el.clientWidth, $el.offsetWidth)
);

export const getSize = $el => ({
  width: getWidth($el),
  height: getHeight($el),
});

export const getDocumentSize = () => ({
  width: Math.max(getWidth(document.body), getWidth(document.documentElement)),
  height: Math.max(getHeight(document.body), getHeight(document.documentElement)),
});

export const getViewportAndElementSizes = ($el) => {
  const isRoot = isRootContainer($el);

  return {
    viewport: {
      width: isRoot
        ? Math.min(window.innerWidth, document.documentElement.clientWidth)
        : $el.clientWidth,
      height: isRoot ? window.innerHeight : $el.clientHeight,
    },
    size: isRoot ? getDocumentSize() : getSize($el),
  };
};
