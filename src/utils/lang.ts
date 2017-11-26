export const isNumber = (obj: any): obj is number => typeof obj === 'number';
export const isString = (obj: any): obj is string => typeof obj === 'string';
export const isFunction = (obj: any): boolean => typeof obj === 'function';
export const isArray = (obj: any): boolean => Array.isArray(obj);
export const isObject = (obj: any): boolean => !isArray(obj) && !isFunction(obj) && typeof obj === 'object';
export const isNumeric = (obj: any): boolean => !isArray(obj) && ((obj - parseFloat(obj)) + 1) >= 0;

export const hasProp = (obj: any, key: string): boolean => (
  obj && obj.hasOwnProperty(key) // eslint-disable-line no-prototype-builtins
);

export const keys = (obj: any): string[] => (
  Object.keys(obj)
);

type Iteratee = <T>(value: T, key: string | number) => boolean;

export const each = <T>(obj: object | T[], iteratee: Iteratee): void => {
  if (isObject(obj)) {
    const k = keys(obj);
    for (let i = 0; i < k.length; i += 1) {
      if (iteratee(obj[k[i]], k[i]) === false) {
        break;
      }
    }
  } else if (isArray(obj)) {
    for (let i = 0; i < (obj as T[]).length; i += 1) {
      if (iteratee.call(obj, obj[i], i) === false) {
        break;
      }
    }
  }
};

export const merge = (...sources: any[]): any => {
  const result = {};
  each(sources, (source) => {
    each(source, (value, key) => {
      result[key] = value;
      return true;
    });
    return true;
  });
  return result;
};
