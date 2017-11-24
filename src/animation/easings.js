/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-plusplus */
/* eslint-disable no-cond-assign */
/* eslint-disable no-restricted-properties */
const {
  cos, sin, pow,
  abs, sqrt, asin,
  PI,
} = Math;

export const linear = p => p;

export const easeInQuad = (x, t, b, c, d) => (
  c * (t /= d) * t + b
);

export const easeOutQuad = (x, t, b, c, d) => (
  -c * (t /= d) * (t - 2) + b
);

export const easeInOutQuad = (x, t, b, c, d) => (
  (t /= d / 2) < 1 ? c / 2 * t * t + b : -c / 2 * ((--t) * (t - 2) - 1) + b
);

export const easeInCubic = (x, t, b, c, d) => (
  c * (t /= d) * t * t + b
);

export const easeOutCubic = (x, t, b, c, d) => (
  c * ((t = t / d - 1) * t * t + 1) + b
);

export const easeInOutCubic = (x, t, b, c, d) => (
  (t /= d / 2) < 1 ? c / 2 * t * t * t + b : c / 2 * ((t -= 2) * t * t + 2) + b
);

export const easeInQuart = (x, t, b, c, d) => (
  c * (t /= d) * t * t * t + b
);

export const easeOutQuart = (x, t, b, c, d) => (
  -c * ((t = t / d - 1) * t * t * t - 1) + b
);

export const easeInOutQuart = (x, t, b, c, d) => (
  (t /= d / 2) < 1 ? c / 2 * t * t * t * t + b : -c / 2 * ((t -= 2) * t * t * t - 2) + b
);

export const easeInQuint = (x, t, b, c, d) => (
  c * (t /= d) * t * t * t * t + b
);

export const easeOutQuint = (x, t, b, c, d) => (
  c * ((t = t / d - 1) * t * t * t * t + 1) + b
);

export const easeInOutQuint = (x, t, b, c, d) => (
  (t /= d / 2) < 1 ? c / 2 * t * t * t * t * t + b : c / 2 * ((t -= 2) * t * t * t * t + 2) + b
);

export const easeInSine = (x, t, b, c, d) => (
  -c * cos(t / d * (PI / 2)) + c + b
);

export const easeOutSine = (x, t, b, c, d) => (
  c * sin(t / d * (PI / 2)) + b
);

export const easeInOutSine = (x, t, b, c, d) => (
  -c / 2 * (cos(PI * t / d) - 1) + b
);

export const easeInExpo = (x, t, b, c, d) => (
  (t === 0) ? b : c * pow(2, 10 * (t / d - 1)) + b
);

export const easeOutExpo = (x, t, b, c, d) => (
  (t === d) ? b + c : c * (-pow(2, -10 * t / d) + 1) + b
);

export const easeInOutExpo = (x, t, b, c, d) => {
  if (t === 0) return b;
  if (t === d) return b + c;
  if ((t /= d / 2) < 1) return c / 2 * pow(2, 10 * (t - 1)) + b;
  return c / 2 * (-pow(2, -10 * --t) + 2) + b;
};

export const easeInCirc = (x, t, b, c, d) => (
  -c * (sqrt(1 - (t /= d) * t) - 1) + b
);

export const easeOutCirc = (x, t, b, c, d) => (
  c * sqrt(1 - (t = t / d - 1) * t) + b
);

export const easeInOutCirc = (x, t, b, c, d) => (
  (t /= d / 2) < 1 ? -c / 2 * (sqrt(1 - t * t) - 1) + b : c / 2 * (sqrt(1 - (t -= 2) * t) + 1) + b
);

export const easeInElastic = (x, t, b, c, d) => {
  let s = 1.70158;
  let p = 0;
  let a = c;
  if (t === 0) return b;
  if ((t /= d) === 1) return b + c;
  if (!p) p = d * 0.3;
  if (a < abs(c)) {
    a = c;
    s = p / 4;
  } else {
    s = p / (2 * PI) * asin(c / a);
  }
  return -(a * pow(2, 10 * (t -= 1)) * sin((t * d - s) * (2 * PI) / p)) + b;
};

export const easeOutElastic = (x, t, b, c, d) => {
  let s = 1.70158;
  let p = 0;
  let a = c;
  if (t === 0) return b;
  if ((t /= d) === 1) return b + c;
  if (!p) p = d * 0.3;
  if (a < abs(c)) {
    a = c;
    s = p / 4;
  } else {
    s = p / (2 * PI) * asin(c / a);
  }
  return a * pow(2, -10 * t) * sin((t * d - s) * (2 * PI) / p) + c + b;
};

export const easeInOutElastic = (x, t, b, c, d) => {
  let s = 1.70158;
  let p = 0;
  let a = c;
  if (t === 0) return b;
  if ((t /= d / 2) === 2) return b + c;
  if (!p) p = d * (0.3 * 1.5);
  if (a < abs(c)) {
    a = c;
    s = p / 4;
  } else {
    s = p / (2 * PI) * asin(c / a);
  }
  if (t < 1) {
    return -0.5 * (a * pow(2, 10 * (t -= 1)) * sin((t * d - s) * (2 * PI) / p)) + b;
  }
  return a * pow(2, -10 * (t -= 1)) * sin((t * d - s) * (2 * PI) / p) * 0.5 + c + b;
};

export const easeInBack = (x, t, b, c, d, s = 1.70158) => (
  c * (t /= d) * t * ((s + 1) * t - s) + b
);

export const easeOutBack = (x, t, b, c, d, s = 1.70158) => (
  c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
);

export const easeInOutBack = (x, t, b, c, d, s = 1.70158) => (
  (t /= d / 2) < 1
    ? c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b
    : c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b
);

export const easeOutBounce = (x, t, b, c, d) => {
  if ((t /= d) < (1 / 2.75)) {
    return c * (7.5625 * t * t) + b;
  } else if (t < (2 / 2.75)) {
    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
  } else if (t < (2.5 / 2.75)) {
    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
  }
  return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
};

export const easeInBounce = (x, t, b, c, d) => (
  c - easeOutBounce(x, d - t, 0, c, d) + b
);

export const easeInOutBounce = (x, t, b, c, d) => (
  t < d / 2
    ? easeInBounce(x, t * 2, 0, c, d) * 0.5 + b
    : easeOutBounce(x, t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b
);
