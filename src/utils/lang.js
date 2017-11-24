const classTypeList = ['Boolean', 'Number', 'String', 'Function', 'Array', 'Object'];
const classTypes = {};

classTypeList.forEach((name) => {
  classTypes[`[object ${name}]`] = name.toLowerCase();
});

export const getType = (obj) => {
  if (obj == null) {
    return '';
  }

  return typeof obj === 'object' || typeof obj === 'function'
    ? classTypes[Object.prototype.toString.call(obj)] || 'object'
    : typeof obj;
};

export const isNumber = obj => getType(obj) === 'number';
export const isString = obj => getType(obj) === 'string';
export const isFunction = obj => getType(obj) === 'function';
export const isArray = obj => Array.isArray(obj);
export const isObject = obj => !isArray(obj) && getType(obj) === 'object';
export const isNumeric = obj => !isArray(obj) && ((obj - parseFloat(obj)) + 1) >= 0;

export const hasProp = (obj, key) => (
  obj && obj.hasOwnProperty(key) // eslint-disable-line no-prototype-builtins
);

export const keys = obj => (
  Object.keys(obj)
);

export const each = (obj, iteratee) => {
  if (obj == null) {
    return;
  }

  if (isObject(obj)) {
    const k = keys(obj);
    for (let i = 0; i < k.length; i += 1) {
      if (iteratee.call(obj, obj[k[i]], k[i]) === false) break;
    }
  } else if (isArray(obj)) {
    for (let i = 0; i < obj.length; i += 1) {
      if (iteratee.call(obj, obj[i], i) === false) break;
    }
  }
};

export const merge = (...sources) => {
  const result = {};
  each(sources, (source) => {
    each(source, (value, key) => {
      result[key] = value;
    });
  });
  return result;
};
