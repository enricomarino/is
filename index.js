/* globals window, document, HTMLElement */
/* eslint-disable promise/prefer-await-to-then */

/** !
 * is
 * the definitive JavaScript type testing library
 *
 * @copyright 2013-2014 Enrico Marino / Jordan Harband
 * @license MIT
 */

const objectProto = Object.prototype;
const owns = objectProto.hasOwnProperty;
const toString_ = objectProto.toString;

const NON_HOST_TYPES = {
  boolean: 1,
  number: 1,
  string: 1,
  undefined: 1,
};

const base64Regex =
  /^([A-Za-z\d+/]{4})*([A-Za-z\d+/]{4}|[A-Za-z\d+/]{3}=|[A-Za-z\d+/]{2}==)$/;
const hexRegex = /^[A-Fa-f\d]+$/;

/**
 * Expose `is`
 */

const is = {};

/**
 * Test general.
 */

/**
 * Test if `value` is a type of `type`.
 *
 * @param {*} value value to test
 * @param {String} type type
 * @return {Boolean} true if `value` is a type of `type`, false otherwise
 * @api public
 */

is.a = (value, type) => typeof value === type;

/**
 * Test if `value` is a type of `type`.
 *
 * @param {*} value value to test
 * @param {String} type type
 * @return {Boolean} true if `value` is a type of `type`, false otherwise
 * @api public
 */

is.type = (value, type) => typeof value === type;

/**
 * Test if `value` is defined.
 *
 * @param {*} value value to test
 * @return {Boolean} true if 'value' is defined, false otherwise
 * @api public
 */

is.defined = value => typeof value !== 'undefined';

/**
 * Test if `value` is empty.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is empty, false otherwise
 * @api public
 */

is.empty = function (value) {
  const type = toString_.call(value);
  let key;

  if (
    type === '[object Array]' ||
    type === '[object Arguments]' ||
    type === '[object String]'
  ) {
    return value.length === 0;
  }

  if (type === '[object Object]') {
    for (key in value) {
      if (owns.call(value, key)) {
        return false;
      }
    }

    return true;
  }

  return !value;
};

/**
 * Test if `value` is equal to `other`.
 *
 * @param {*} value value to test
 * @param {*} other value to compare with
 * @return {Boolean} true if `value` is equal to `other`, false otherwise
 */

is.equal = (value, other) => {
  if (value === other) {
    return true;
  }

  const type = toString_.call(value);
  let key;

  if (type !== toString_.call(other)) {
    return false;
  }

  if (type === '[object Object]') {
    for (key in value) {
      if (!is.equal(value[key], other[key]) || !(key in other)) {
        return false;
      }
    }

    for (key in other) {
      if (!is.equal(value[key], other[key]) || !(key in value)) {
        return false;
      }
    }

    return true;
  }

  if (type === '[object Array]') {
    key = value.length;
    if (key !== other.length) {
      return false;
    }

    while (key--) {
      if (!is.equal(value[key], other[key])) {
        return false;
      }
    }

    return true;
  }

  if (type === '[object Function]') {
    return value.prototype === other.prototype;
  }

  if (type === '[object Date]') {
    return value.getTime() === other.getTime();
  }

  return false;
};

/**
 * Test if `value` is hosted by `host`.
 *
 * @param {*} value to test
 * @param {*} host host to test with
 * @return {Boolean} true if `value` is hosted by `host`, false otherwise
 * @api public
 */

is.hosted = function (value, host) {
  const type = typeof host[value];
  return type === 'object' ? Boolean(host[value]) : !NON_HOST_TYPES[type];
};

/**
 * Test if `value` is an instance of `constructor`.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an instance of `constructor`
 * @api public
 */

is.instance = (value, constructor) => value instanceof constructor;

/**
 * Test if `value` is an instance of `constructor`.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an instance of `constructor`
 * @api public
 */

is.instanceof = (value, constructor) => value instanceof constructor;

/**
 * Test if `value` is null.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is null, false otherwise
 * @api public
 */

is.nil = value => value === null;

/**
 * Test if `value` is null.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is null, false otherwise
 * @api public
 */

is.null = value => value === null;

/**
 * Test if `value` is undefined.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is undefined, false otherwise
 * @api public
 */

is.undef = value => typeof value === 'undefined';

/**
 * Test if `value` is undefined.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is undefined, false
 * @api public
 */

is.undefined = value => typeof value === 'undefined';

/**
 * Test arguments.
 */

/**
 * Test if `value` is an arguments object.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an arguments object, false otherwise
 * @api public
 */

is.args = value => {
  const isStandardArguments = toString_.call(value) === '[object Arguments]';
  const isOldArguments =
    !is.array(value) &&
    is.arraylike(value) &&
    is.object(value) &&
    is.fn(value.callee);
  return isStandardArguments || isOldArguments;
};

/**
 * Test if `value` is an arguments object.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an arguments object, false otherwise
 * @api public
 */

is.arguments = value => {
  const isStandardArguments = toString_.call(value) === '[object Arguments]';
  const isOldArguments =
    !is.array(value) &&
    is.arraylike(value) &&
    is.object(value) &&
    is.fn(value.callee);
  return isStandardArguments || isOldArguments;
};

/**
 * Test array.
 */

/**
 * Test if 'value' is an array.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an array, false otherwise
 * @api public
 */

is.array = value =>
  Array.isArray(value) || toString_.call(value) === '[object Array]';

/**
 * Test if `value` is an empty arguments object.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an empty arguments object, false otherwise
 * @api public
 */

is.args.empty = value => is.args(value) && value.length === 0;

/**
 * Test if `value` is an empty array.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an empty array, false otherwise
 * @api public
 */

is.array.empty = value => is.array(value) && value.length === 0;

/**
 * Test if `value` is an arraylike object.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an arguments object, false otherwise
 * @api public
 */

is.arraylike = function (value) {
  return (
    Boolean(value) &&
    !is.bool(value) &&
    owns.call(value, 'length') &&
    Number.isFinite(value.length) &&
    is.number(value.length) &&
    value.length >= 0
  );
};

/**
 * Test boolean.
 */

/**
 * Test if `value` is a boolean.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a boolean, false otherwise
 * @api public
 */

is.bool = value => toString_.call(value) === '[object Boolean]';

/**
 * Test if `value` is a boolean.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a boolean, false otherwise
 * @api public
 */

is.boolean = value => toString_.call(value) === '[object Boolean]';

/**
 * Test if `value` is false.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is false, false otherwise
 * @api public
 */

is.false = value => is.bool(value) && Boolean(Number(value)) === false;

/**
 * Test if `value` is true.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is true, false otherwise
 * @api public
 */

is.true = value => is.bool(value) && Boolean(Number(value)) === true;

/**
 * Test date.
 */

/**
 * Test if `value` is a date.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a date, false otherwise
 * @api public
 */

is.date = value => toString_.call(value) === '[object Date]';

/**
 * Test if `value` is a valid date.
 *
 * @param {*} value value to test
 * @returns {Boolean} true if `value` is a valid date, false otherwise
 */

is.date.valid = value => is.date(value) && !Number.isNaN(Number(value));

/**
 * Test element.
 */

/**
 * Test if `value` is an html element.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an HTML Element, false otherwise
 * @api public
 */

is.element = value =>
  value !== undefined &&
  typeof HTMLElement !== 'undefined' &&
  value instanceof HTMLElement &&
  value.nodeType === 1;

/**
 * Test error.
 */

/**
 * Test if `value` is an error object.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an error object, false otherwise
 * @api public
 */

is.error = value => toString_.call(value) === '[object Error]';

/**
 * Test function.
 */

/**
 * Test if `value` is a function.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a function, false otherwise
 * @api public
 */

is.fn = value => typeof value === 'function';

/**
 * Test if `value` is a function.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a function, false otherwise
 * @api public
 */

is.function = value => typeof value === 'function';

/**
 * Test if `value` is a function and `then` can be called
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a thenable function, false otherwise
 * @api public
 */

is.thenable = value => value && is.function(value.then);

/**
 * Test if `value` is a promise.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a promise, false otherwise
 * @api public
 */

is.promise = value => is.thenable(value) && is.function(value.catch);

/**
 * Test number.
 */

/**
 * Test if `value` is a number.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a number, false otherwise
 * @api public
 */

is.number = value => toString_.call(value) === '[object Number]';

/**
 * Test if `value` is a number.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a number, false otherwise
 * @api public
 */

is.num = value => toString_.call(value) === '[object Number]';

/**
 * Test if `value` is positive or negative infinity.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is positive or negative Infinity, false otherwise
 * @api public
 */

is.infinite = value =>
  value === Number.POSITIVE_INFINITY || value === Number.NEGATIVE_INFINITY;

/**
 * Test if `value` is a decimal number.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a decimal number, false otherwise
 * @api public
 */

is.decimal = value =>
  is.num(value) &&
  !is.infinite(value) &&
  !Number.isNaN(value) &&
  value % 1 !== 0;

/**
 * Test if `value` is divisible by `n`.
 *
 * @param {Number} value value to test
 * @param {Number} n dividend
 * @return {Boolean} true if `value` is divisible by `n`, false otherwise
 * @api public
 */

is.divisibleBy = function (value, n) {
  const isDividendInfinite = is.infinite(value);
  const isDivisorInfinite = is.infinite(n);
  const isNonZeroNumber =
    is.number(value) &&
    !Number.isNaN(value) &&
    is.number(n) &&
    !Number.isNaN(n) &&
    n !== 0;
  return (
    isDividendInfinite ||
    isDivisorInfinite ||
    (isNonZeroNumber && value % n === 0)
  );
};

/**
 * Test if `value` is an integer.
 *
 * @param value to test
 * @return {Boolean} true if `value` is an integer, false otherwise
 * @api public
 */

is.integer = value => is.num(value) && !Number.isNaN(value) && value % 1 === 0;

/**
 * Test if `value` is a 'safe' integer.
 *
 * @param value to test
 * @return {Boolean} true if `value` is a 'safe' integer, false otherwise
 * @api public
 */

is.safeInteger = value => Number.isSafeInteger(value) && !Number.isNaN(value);

/**
 * Test if `value` is a BigInt
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a BigInt, false otherwise
 * @api public
 */

is.bigInt = value => typeof value === 'bigint';

/**
 * Test if `value` is a float.
 *
 * @param value to test
 * @return {Boolean} true if `value` is a float, false otherwise
 * @api public
 */

is.float = value =>
  is.num(value) && !Number.isNaN(value) && Math.floor(value) !== value;

/**
 * Test if `value` is greater than 'others' values.
 *
 * @param {Number} value value to test
 * @param {Array} others values to compare with
 * @return {Boolean} true if `value` is greater than `others` values
 * @api public
 */

is.maximum = function (value, others) {
  if (Number.isNaN(value)) {
    throw new TypeError('NaN is not a valid value');
  } else if (!is.arraylike(others)) {
    throw new TypeError('second argument must be array-like');
  }

  let {length} = others;

  while (--length >= 0) {
    if (value < others[length]) {
      return false;
    }
  }

  return true;
};

/**
 * Test if `value` is less than `others` values.
 *
 * @param {Number} value value to test
 * @param {Array} others values to compare with
 * @return {Boolean} true if `value` is less than `others` values
 * @api public
 */

is.minimum = function (value, others) {
  if (Number.isNaN(value)) {
    throw new TypeError('NaN is not a valid value');
  } else if (!is.arraylike(others)) {
    throw new TypeError('second argument must be array-like');
  }

  let {length} = others;

  while (--length >= 0) {
    if (value > others[length]) {
      return false;
    }
  }

  return true;
};

/**
 * Test if `value` is not a number.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is not a number, false otherwise
 * @api public
 */

is.nan = value => !is.number(value) || Number.isNaN(value);

/**
 * Test if `value` is an even number.
 *
 * @param {Number} value value to test
 * @return {Boolean} true if `value` is an even number, false otherwise
 * @api public
 */

is.even = value =>
  is.infinite(value) ||
  (is.number(value) && value % 2 === 0);

/**
 * Test if `value` is an odd number.
 *
 * @param {Number} value value to test
 * @return {Boolean} true if `value` is an odd number, false otherwise
 * @api public
 */

is.odd = value =>
  is.infinite(value) ||
  (is.number(value) && value % 2 !== 0);

/**
 * Test if `value` is greater than or equal to `other`.
 *
 * @param {Number} value value to test
 * @param {Number} other value to compare with
 * @return {Boolean}
 * @api public
 */

is.ge = function (value, other) {
  if (Number.isNaN(value) || Number.isNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }

  return !is.infinite(value) && !is.infinite(other) && value >= other;
};

/**
 * Test if `value` is greater than `other`.
 *
 * @param {Number} value value to test
 * @param {Number} other value to compare with
 * @return {Boolean}
 * @api public
 */

is.gt = function (value, other) {
  if (Number.isNaN(value) || Number.isNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }

  return !is.infinite(value) && !is.infinite(other) && value > other;
};

/**
 * Test if `value` is less than or equal to `other`.
 *
 * @param {Number} value value to test
 * @param {Number} other value to compare with
 * @return {Boolean} if 'value' is less than or equal to 'other'
 * @api public
 */

is.le = function (value, other) {
  if (Number.isNaN(value) || Number.isNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }

  return !is.infinite(value) && !is.infinite(other) && value <= other;
};

/**
 * Test if `value` is less than `other`.
 *
 * @param {Number} value value to test
 * @param {Number} other value to compare with
 * @return {Boolean} if `value` is less than `other`
 * @api public
 */

is.lt = function (value, other) {
  if (Number.isNaN(value) || Number.isNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }

  return !is.infinite(value) && !is.infinite(other) && value < other;
};

/**
 * Test if `value` is within `start` and `finish`.
 *
 * @param {Number} value value to test
 * @param {Number} start lower bound
 * @param {Number} finish upper bound
 * @return {Boolean} true if 'value' is is within 'start' and 'finish'
 * @api public
 */

is.within = function (value, start, finish) {
  if (Number.isNaN(value) || Number.isNaN(start) || Number.isNaN(finish)) {
    throw new TypeError('NaN is not a valid value');
  } else if (!is.number(value) || !is.number(start) || !is.number(finish)) {
    throw new TypeError('all arguments must be numbers');
  }

  const isAnyInfinite =
    is.infinite(value) || is.infinite(start) || is.infinite(finish);
  return isAnyInfinite || (value >= start && value <= finish);
};

/**
 * Test object.
 */

/**
 * Test if `value` is an object.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an object, false otherwise
 * @api public
 */

is.object = value => toString_.call(value) === '[object Object]';

/**
 * Test if `value` is a primitive.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a primitive, false otherwise
 * @api public
 */

is.primitive = value => {
  if (!value) {
    return true;
  }

  if (
    typeof value === 'object' ||
    is.object(value) ||
    is.fn(value) ||
    is.array(value)
  ) {
    return false;
  }

  return true;
};

/**
 * Test if `value` is a hash - a plain object literal.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a hash, false otherwise
 * @api public
 */

is.hash = value =>
  is.object(value) &&
  value.constructor === Object &&
  !value.nodeType &&
  !value.setInterval;

/**
 * Test regexp.
 */

/**
 * Test if `value` is a regular expression.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a regexp, false otherwise
 * @api public
 */

is.regexp = value => toString_.call(value) === '[object RegExp]';

/**
 * Test string.
 */

/**
 * Test if `value` is a string.
 *
 * @param {*} value value to test
 * @return {Boolean} true if 'value' is a string, false otherwise
 * @api public
 */

is.string = value => toString_.call(value) === '[object String]';

/**
 * Test base64 string.
 */

/**
 * Test if `value` is a valid base64 encoded string.
 *
 * @param {*} value value to test
 * @return {Boolean} true if 'value' is a base64 encoded string, false otherwise
 * @api public
 */

is.base64 = value =>
  is.string(value) && (value.length === 0 || base64Regex.test(value));

/**
 * Test base64 string.
 */

/**
 * Test if `value` is a valid hex encoded string.
 *
 * @param {*} value value to test
 * @return {Boolean} true if 'value' is a hex encoded string, false otherwise
 * @api public
 */

is.hex = value =>
  is.string(value) && (value.length === 0 || hexRegex.test(value));

/**
 * Test if `value` is an ES6 Symbol
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a Symbol, false otherise
 * @api public
 */

is.symbol = value => typeof value === 'symbol';

/**
 * Test if `value` is a prototype
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a prototype, false otherwise
 */

is.prototype = value => {
  const Ctor = value && value.constructor;
  const proto = (typeof Ctor === 'function' && Ctor.prototype) || objectProto;
  return value === proto;
};

/**
 * Test if `value` is an event.
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is an event, false otherwise
 */

is.event = value => is.function(value.listen) && is.function(value.broadcast);

/**
 * Test if `value` is a Map
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a Map, false otherwise
 */

is.map = value => value instanceof Map;

/**
 * Test if `value` is a WeakMap
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a WeakMap, false otherwise
 */

is.weakMap = value => value instanceof WeakMap;

/**
 * Test if `value` is a Set
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a Set, false otherwise
 */

is.set = value => value instanceof Set;

/**
 * Test if `value` is a WeakSet
 *
 * @param {*} value value to test
 * @return {Boolean} true if `value` is a WeakSet, false otherwise
 */

is.weakSet = value => value instanceof WeakSet;

/**
 * Test if `env` is Node
 *
 * @return {Boolean} true if `env` is Node, false otherwise
 */

is.node = () => typeof window !== 'undefined';

/**
 * Test if `env` is Browser
 *
 * @return {Boolean} true if `env` is Browser, false otherwise
 */

is.browser = () => ![typeof window, typeof document].includes('undefined');

module.exports = is;
