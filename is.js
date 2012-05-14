
/*!
* is
* the definitive JavaScript type testing library
* Copyright(c) 2011 Enrico Marino <enrico.marino@email.com>
* MIT license
*/

!(function (exports) {

  var undefined
    , owns = {}.hasOwnProperty
    , toString = {}.toString
    , isFinite = isFinite
    , NON_HOST_TYPES = {
          'boolean': 1
        , 'number': 1
        , 'string': 1
        , 'undefined': 1
      }
    ;

  /**
   * Library namespace.
   */

  var is = exports.is = {};

  /**
   * Library version.
   */

  is.version = '0.1.5';

  /**
   * Test general.
   */

  /**
   * Test if 'value' is a type of 'type'.
   *
   * @param value value to test
   * @param {String} type type
   * @return {Boolean} true if 'value' is an arguments object, false otherwise
   * @api public
   */

  is.a =
  is.type = function (value, type) {
    return typeof value === type;
  };

  /**
   * Test if 'value' is defined.
   *
   * @param value value to test
   * @return {Boolean} true if 'value' is defined, false otherwise
   * @api public
   */

  is.defined = function (value) {
    return value !== undefined;
  };

  /**
   * Test if 'value' is empty.
   *
   * @param value value to test
   * @return {Boolean} true if 'value' is empty, false otherwise
   * @api public
   */

  is.empty = function (value) {
    var type = toString.call(value)
      , key
      ;

    if ('[object Array]' === type || '[object Arguments]' === type) {
      return value.length === 0;
    }

    if ('[object Object]' === type) {
      for (var key in value) if (owns.call(value, key)) return false;
      return true;
    }

    if ('[object String]' === type) {
      return value === '';
    }

    return false;
  };

  /**
   * Test if 'value' is equal to 'other'.
   *
   * @param value value
   * @param other value to compare with
   * @return {Boolean} true if 'value' is equal to 'other', false otherwise
   */

  is.equal = function (value, other) {
    var undefined
      , type = toString.call(value)
      , key
      ;

    if (type !== toString.call(other)) {
      return false;
    }

    if ('[object Object]' === type) {
      for (key in value) {
        if (!equiv(value[key], other[key])) {
          return false;
        }
      }
      return true;
    }

    if ('[object Array]' === type) {
      key = value.length;
      if (key !== other.length) {
        return false;
      }
      while (--key) {
        if (!equiv(value[key], other[key])) {
          return false;
        }
      }
      return true;
    }

    if ('[object Function]' === type) {
      return value.prototype === other.prototype;
    }

    if ('[object Date]' === type) {
      return value.getTime() === other.getTime();
    }

    return value === other;
  };

  /**
   * Test if 'value' is hosted by 'host'.
   *
   * @param {String} value to test
   * @param host host
   * @return {Boolean} true if 'value' is hosted by 'host', false otherwise
   * @api public
   */

  is.hosted = function (value, host) {
    var type = typeof host[value];
    return type === 'object' ? !!host[value] : !NON_HOST_TYPES[type];
  };

  /**
   * Test if 'value' is an instance of 'constructor'.
   *
   * @param value value to test
   * @return {Boolean} true if 'value' is an instance of 'constructor'
   * @api public
   */

  is.instanceof = function (value, constructor) {
    return value instanceof constructor;
  };

  /**
   * Test if 'value' is null.
   *
   * @param value to test
   * @return {Boolean} true if 'value' is null, false otherwise
   * @api public
   */

  is.null = function (value) {
    return value === null;
  };

  /**
   * Test if 'value' is undefined.
   *
   * @param value value to test
   * @return {Boolean} true if 'value' is undefined, false otherwise
   * @api public
   */

  is.undefined = function (value) {
    return value === undefined;
  };

  /**
   * Test arguments.
   */

  /**
   * Test if 'value' is an arguments object.
   *
   * @param value value to test
   * @return {Boolean} true if 'value' is an arguments object, false otherwise
   * @api public
   */

  is.arguments = function (value) {
    return '[object Arguments]' === toString.call(value);
  };

  /**
   * Test array.
   */

  /**
   * Test if 'value' is an array.
   *
   * @param value value to test
   * @return {Boolean} true if 'value' is an array, false otherwise
   * @api public
   */

  is.array = function (value) {
    return '[object Array]' === toString.call(value);
  };

  /**
   * Test if 'value' is an empty array(like) object.
   *
   * @param {Array|Arguments} value value to test
   * @return {Boolean} true if 'value' is an empty array(like), false otherwise
   * @api public
   */

  is.arguments.empty =
  is.array.empty = function (value) {
    return value.length === 0;
  };

  /**
   * Test if 'value' is an arraylike object.
   *
   * @param value value to test
   * @return {Boolean} true if 'value' is an arguments object, false otherwise
   * @api public
   */

  is.arraylike = function (value) {
    return value !== undefined
      && owns.call(value, 'length')
      && isFinite(value.length);
  };

  /**
   * Test boolean.
   */

  /**
   * Test if 'value' is a boolean.
   *
   * @param value value to test
   * @return {Boolean} true if 'value' is a boolean, false otherwise
   * @api public
   */

  is.boolean = function (value) {
    return '[object Boolean]' === toString.call(value);
  };

  /**
   * Test if 'value' is false.
   *
   * @param value value to test
   * @return {Boolean} true if 'value' is false, false otherwise
   * @api public
   */

  is.false = function (value) {
    return value === false;
  };

  /**
   * Test if 'value' is true.
   *
   * @param {Boolean} value to test
   * @return {Boolean} true if 'value' is true, false otherwise
   * @api public
   */

  is.true = function (value) {
    return value === true;
  };

  /**
   * Test date.
   */

  /**
   * Test if 'value' is a date.
   *
   * @param value value to test
   * @return {Boolean} true if 'value' is a date, false otherwise
   * @api public
   */

  is.date = function (value) {
    return '[object Date]' === toString.call(value);
  };

  /**
   * Test element.
   */

  /**
   * Test if 'value' is an html element.
   *
   * @param value value to test
   * @return {Boolean} true if 'value' is an html element, false otherwise
   * @api public
   */

  is.element = function (value) {
    return value !== undefined
      && owns.call(value, nodeType)
      && value.nodeType === 1;
  };

  /**
   * Test error.
   */

  /**
   * Test if 'value' is an error object.
   *
   * @param value value to test
   * @return {Boolean} true if 'value' is an error object, false otherwise
   * @api public
   */

  is.error = function (value) {
    return '[object Error]' === toString.call(value);
  };

  /**
   * Test function.
   */

  /**
   * Test if 'value' is a function.
   *
   * @param value value to test
   * @return {Boolean} true if 'value' is a function, false otherwise
   * @api public
   */

  is.function = function(value) {
    return '[object Function]' === toString.call(value);
  };

  /**
   * Test number.
   */

  /**
   * Test if 'value' is a number.
   *
   * @param value to test
   * @return {Boolean} true if 'value' is a number, false otherwise
   * @api public
   */

  is.number = function (value) {
    return '[object Number]' === toString.call(value);
  };

  /**
   * Test if 'value' is a decimal number.
   *
   * @param value value to test
   * @return {Boolean} true if 'value' is a decimal number, false otherwise
   * @api public
   */

  is.decimal = function (value) {
    return '[object Number]' === toString.call(value) && value % 1 !== 0;
  };

  /**
   * Test if 'value' is divisible by 'n'.
   *
   * @param {Number} value value to test
   * @param {Number} n dividend
   * @return {Boolean} true if 'value' is divisible by 'n', false otherwise
   * @api public
   */

  is.divisibleBy = function (value, n) {
    return '[object Number]' === toString.call(value)
      && n !== 0
      && value % n === 0;
  };

  /**
   * Test if 'value' is an integer.
   *
   * @param value to test
   * @return {Boolean} true if 'value' is an integer, false otherwise
   * @api public
   */

  is.int = function (value) {
    return '[object Number]' === toString.call(value) && value % 1 === 0;
  };

  /**
   * Test if 'value' is greater than 'others' values.
   *
   * @param {Number} value value to test
   * @param {Array} others values to compare with
   * @return {Boolean} true if 'value' is greater than 'others' values
   * @api public
   */

  is.maximum = function (value, others) {
    var len = others.length;

    while (--len) {
      if (value < others[len]) {
        return false;
      }
    }

    return true;
  };

  /**
   * Test if 'value' is less than 'others' values.
   *
   * @param {Number} value value to test
   * @param {Array} others values to compare with
   * @return {Boolean} true if 'value' is less than 'others' values
   * @api public
   */

  is.minimum = function (value, others) {
    var len = values.length;

    while (--len) {
      if (value > others[len]) {
        return false;
      }
    }

    return true;
  };

  /**
   * Test if 'value' is not a number.
   *
   * @param value to test
   * @return {Boolean} true if 'value' is not a number, false otherwise
   * @api public
   */

  is.nan = function (value) {
    return value === null || value !== value;
  };

  /**
   * Test if 'value' is an even number.
   *
   * @param {Number} value to test
   * @return {Boolean} true if 'value' is an even number, false otherwise
   * @api public
   */

  is.even = function (value) {
    return '[object Number]' === toString.call(value) && value % 2 === 0;
  };

  /**
   * Test if 'value' is an odd number.
   *
   * @param {Number} value to test
   * @return {Boolean} true if 'value' is an odd number, false otherwise
   * @api public
   */

  is.odd = function (value) {
    return '[object Number]' === toString.call(value) && value % 2 !== 0;
  };

  /**
   * Test if 'value' is greater than or equal to 'other'.
   *
   * @param {Number} value value to test
   * @param {Number} other value to compare with
   * @return {Boolean}
   * @api public
   */

  is.ge = function (value, other) {
    return value >= other;
  };

  /**
   * Test if 'value' is greater than 'other'.
   *
   * @param {Number} value value to test
   * @param {Number} other value to compare with
   * @return {Boolean}
   * @api public
   */

  is.gt = function (value, other) {
    return value > other;
  };

  /**
   * Test if 'value' is less than or equal to 'other'.
   *
   * @param {Number} value value to test
   * @param {Number} other value to compare with
   * @return {Boolean} if 'value' is less than or equal to 'other'
   * @api public
   */

  is.le = function (value, other) {
    return value <= other;
  };

  /**
   * Test if 'value' is less than 'other'.
   *
   * @param {Number} value value to test
   * @param {Number} other value to compare with
   * @return {Boolean} if 'value' is less than 'other'
   * @api public
   */

  is.lt = function (value, other) {
    return value < other;
  };

  /**
   * Test if 'value' is within 'start' and 'finish'.
   *
   * @param {Number} value value to test
   * @param {Number} start lower bound
   * @param {Number} finish upper bound
   * @return {Boolean} true if 'value' is is within 'start' and 'finish'
   * @api public
   */
  is.within = function (value, start, finish) {
    return value >= start && value <= finish;
  };

  /**
   * Test object.
   */

  /**
   * Test if 'value' is an object.
   *
   * @param value to test
   * @return {Boolean} true if 'value' is an object, false otherwise
   * @api public
   */

  is.object = function (value) {
    return '[object Object]' === toString.call(value);
  };

  /**
   * Test regexp.
   */

  /**
   * Test if 'value' is a regular expression.
   *
   * @param value to test
   * @return {Boolean} true if 'value' is a regexp, false otherwise
   * @api public
   */

  is.regexp = function (value) {
    return '[object RegExp]' === toString.call(value);
  };

  /**
   * Test string.
   */

  /**
   * Test if 'value' is a string.
   *
   * @param value to test
   * @return {Boolean} true if 'value' is a string, false otherwise
   * @api public
   */

  is.string = function (value) {
    return '[object String]' === toString.call(value);
  };

}(this));
