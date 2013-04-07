var test = require('tape');
var is = require('../index.js');

var forEach = require('foreach');

test('is.type', function (t) {
  var booleans = [true, false];
  forEach(booleans, function (boolean) {
    t.true(is.type(boolean, 'boolean'), '"' + boolean + '" is a boolean');
  });

  var numbers = [1, 0 / 1, 0 / -1, NaN, Infinity, -Infinity];
  forEach(numbers, function (number) {
    t.true(is.type(number, 'number'), '"' + number + '" is a number');
  });

  var objects = [{}, null, new Date()];
  forEach(objects, function (object) {
    t.true(is.type(object, 'object'), '"' + object + '" is an object');
  });

  var strings = ['', 'abc'];
  forEach(strings, function (string) {
    t.true(is.type(string, 'string'), '"' + string + '" is a string');
  });

  t.true(is.type(undefined, 'undefined'), 'undefined is undefined');

  t.end();
});

test('is.undefined', function (t) {
  t.true(is.undefined(), 'undefined is undefined');
  t.false(is.undefined(null), 'null is not undefined');
  t.false(is.undefined({}), 'object is not undefined');
  t.end();
});

test('is.defined', function (t) {
  t.false(is.defined(), 'undefined is not defined');
  t.true(is.defined(null), 'null is defined');
  t.true(is.defined({}), 'object is undefined');
  t.end();
});

test('is.empty', function (t) {
  t.true(is.empty(''), 'empty string is empty');
  t.true(is.empty([]), 'empty array is empty');
  t.true(is.empty({}), 'empty object is empty');
  (function () { t.true(is.empty(arguments), 'empty arguments is empty'); }());
  t.end();
});

test('is.equal', function (t) {
  t.true(is.equal([1, 2, 3], [1, 2, 3]), 'arrays are shallowly equal');
  t.true(is.equal([1, 2, [3, 4]], [1, 2, [3, 4]]), 'arrays are deep equal');
  t.true(is.equal({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 3 }), 'objects are shallowly equal');
  t.true(is.equal({ a: { b: 1 } }, { a: { b: 1 } }), 'objects are deep equal');
  var now = Date.now();
  t.true(is.equal(new Date(now), new Date(now)), 'two equal date objects are equal');

  var F = function () {};
  F.prototype = {};
  t.true(is.equal(new F(), new F()), 'two object instances are equal when the prototype is the same');
  t.end();
});

test('is.hosted', function (t) {
  t.true(is.hosted('a', { a: {} }), 'object is hosted');
  t.true(is.hosted('a', { a: [] }), 'array is hosted');
  t.true(is.hosted('a', { a: function () {} }), 'function is hosted');
  t.false(is.hosted('a', { a: true }), 'boolean value is not hosted');
  t.false(is.hosted('a', { a: false }), 'boolean value is not hosted');
  t.false(is.hosted('a', { a: 3 }), 'number value is not hosted');
  t.false(is.hosted('a', { a: undefined }), 'undefined value is not hosted');
  t.false(is.hosted('a', { a: 'abc' }), 'string value is not hosted');
  t.false(is.hosted('a', { a: null }), 'null value is not hosted');
  t.end();
});

test('is.instanceof', function (t) {
  t.true(is.instanceof(new Date(), Date), 'new Date is instanceof Date');
  var F = function () {};
  t.true(is.instanceof(new F(), F), 'new constructor is instanceof constructor');
  t.end();
});

test('is.null', function (t) {
  t.true(is.null(null), 'null is null');
  t.false(is.null(undefined), 'undefined is not null');
  t.false(is.null({}), 'object is not null');
  t.end();
});

test('is.arguments', function (t) {
  t.false(is.arguments([]), 'array is not arguments');
  (function () { t.true(is.arguments(arguments), 'arguments is arguments'); }());
  (function () { t.false(is.arguments(Array.prototype.slice.call(arguments)), 'sliced arguments is not arguments'); }());
  t.end();
});

test('is.array', function (t) {
  t.true(is.array([]), 'array is array');
  (function () { t.true(is.array(Array.prototype.slice.call(arguments)), 'sliced arguments is array'); }());
  t.end();
});

test('is.array.empty', function (t) {
  t.true(is.array.empty([]), 'empty array is empty array');
  (function () { t.false(is.array.empty(arguments), 'empty arguments is not empty array'); }());
  (function () { t.true(is.array.empty(Array.prototype.slice.call(arguments)), 'empty sliced arguments is empty array'); }());
  t.end();
});

test('is.arguments.empty', function (t) {
  t.false(is.arguments.empty([]), 'empty array is not empty arguments');
  (function () { t.true(is.arguments.empty(arguments), 'empty arguments is empty arguments'); }());
  (function () { t.false(is.arguments.empty(Array.prototype.slice.call(arguments)), 'empty sliced arguments is not empty arguments'); }());
  t.end();
});

test('is.isarraylike', function (t) {
  t.false(is.arraylike(), 'undefined is not array-like');
  t.false(is.arraylike(null), 'null is not array-like');
  t.false(is.arraylike(false), 'false is not array-like');
  t.false(is.arraylike(true), 'true is not array-like');
  t.true(is.arraylike({ length: 0 }), 'object with zero length is array-like');
  t.true(is.arraylike({ length: 1 }), 'object with positive length is array-like');
  t.false(is.arraylike({ length: -1 }), 'object with negative length is not array-like');
  t.false(is.arraylike({ length: NaN }), 'object with NaN length is not array-like');
  t.false(is.arraylike({ length: 'foo' }), 'object with string length is not array-like');
  t.false(is.arraylike({ length: '' }), 'object with empty string length is not array-like');
  t.true(is.arraylike([]), 'array is array-like');
  (function () { t.true(is.arraylike(arguments), 'empty arguments is array-like'); }());
  (function () { t.true(is.arraylike(arguments), 'nonempty arguments is array-like'); }(1, 2, 3));
  t.end();
});

test('is.boolean', function (t) {
  t.true(is.boolean(true), 'literal true is a boolean');
  t.true(is.boolean(false), 'literal false is a boolean');
  t.true(is.boolean(new Boolean(true)), 'object true is a boolean');
  t.true(is.boolean(new Boolean(false)), 'object false is a boolean');
  t.false(is.boolean(), 'undefined is not a boolean');
  t.false(is.boolean(null), 'null is not a boolean');
  t.end();
});

test('is.false', function (t) {
  t.true(is.false(false), 'false is false');
  t.true(is.false(new Boolean(false)), 'object false is false');
  t.false(is.false(true), 'true is not false');
  t.false(is.false(), 'undefined is not false');
  t.false(is.false(null), 'null is not false');
  t.false(is.false(''), 'empty string is not false');
  t.end();
});

test('is.true', function (t) {
  t.true(is.true(true), 'true is true');
  t.true(is.true(new Boolean(true)), 'object true is true');
  t.false(is.true(false), 'false is not true');
  t.false(is.true(), 'undefined is not true');
  t.false(is.true(null), 'null is not true');
  t.false(is.true(''), 'empty string is not true');
  t.end();
});

test('is.date', function (t) {
  t.true(is.date(new Date()), 'new Date is date');
  t.false(is.date(), 'undefined is not date');
  t.false(is.date(null), 'null is not date');
  t.false(is.date(''), 'empty string is not date');
  t.false(is.date(Date.now()), 'timestamp is not date');
  var F = function () {};
  F.prototype = new Date();
  t.false(is.date(new F()), 'Date subtype is not date');
  t.end();
});

test('is.element', function (t) {
  if (typeof HTMLElement !== 'undefined') {
    var element = document.createElement('div');
    t.true(is.element(element), 'HTMLElement is element');
    t.false(is.element({ nodeType: 1 }), 'object with nodeType is not element');
  } else {
    t.true(true, 'Skipping is.element test in a non-browser environment');
  }
  t.end();
});

test('is.error', function (t) {
  var err = new Error('foo');
  t.true(is.error(err), 'Error is error');
  t.false(is.error({}), 'object is not error');
  t.false(is.error({ toString: function () { return '[object Error]'; } }), 'object with error\'s toString is not error');
  t.end();
});

test('is.function', function (t) {
  t.true(is.function(function () {}), 'function is function');
  t.true(is.function(console.log), 'console.log is function');
  if (typeof window !== 'undefined') {
    // in IE7/8, typeof alert === 'object'
    t.true(is.function(window.alert), 'window.alert is function');
  }
  t.false(is.function({}), 'object is not function');
  t.false(is.function(null), 'null is not function');
  t.end();
});

test('is.number', function (t) {
  t.true(is.number(0), 'positive zero is number');
  t.true(is.number(0 / -1), 'negative zero is number');
  t.true(is.number(3), 'three is number');
  t.true(is.number(NaN), 'NaN is number');
  t.true(is.number(Infinity), 'infinity is number');
  t.true(is.number(-Infinity), 'negative infinity is number');
  t.true(is.number(new Number(42)), 'object number is number');
  t.false(is.number(), 'undefined is not number');
  t.false(is.number(null), 'null is not number');
  t.false(is.number(true), 'true is not number');
  t.end();
});

test('is.infinite', function (t) {
  t.true(is.infinite(Infinity), 'positive infinity is infinite');
  t.true(is.infinite(-Infinity), 'negative infinity is infinite');
  t.false(is.infinite(NaN), 'NaN is not infinite');
  t.false(is.infinite(0), 'a number is not infinite');
  t.end();
});

test('is.decimal', function (t) {
  t.true(is.decimal(1.1), 'decimal is decimal');
  t.false(is.decimal(0), 'zero is not decimal');
  t.false(is.decimal(1), 'integer is not decimal');
  t.false(is.decimal(NaN), 'NaN is not decimal');
  t.end();
});

test('is.divisibleBy', function (t) {
  t.true(is.divisibleBy(4, 2), '4 is divisible by 2');
  t.true(is.divisibleBy(4, 2), '4 is divisible by 2');
  t.true(is.divisibleBy(0, 1), '0 is divisible by 1');
  t.true(is.divisibleBy(Infinity, 1), 'infinity is divisible by anything');
  t.true(is.divisibleBy(1, Infinity), 'anything is divisible by infinity');
  t.true(is.divisibleBy(Infinity, Infinity), 'infinity is divisible by infinity');
  t.false(is.divisibleBy(1, 0), '1 is not divisible by 0');
  t.false(is.divisibleBy(NaN, 1), 'NaN is not divisible by 1');
  t.false(is.divisibleBy(1, NaN), '1 is not divisible by NaN');
  t.false(is.divisibleBy(NaN, NaN), 'NaN is not divisible by NaN');
  t.false(is.divisibleBy(1, 3), '1 is not divisible by 3');
  t.end();
});

test('is.int', function (t) {
  t.true(is.int(0), '0 is integer');
  t.true(is.int(3), '3 is integer');
  t.false(is.int(1.1), '1.1 is not integer');
  t.false(is.int(NaN), 'NaN is not integer');
  t.false(is.int(Infinity), 'infinity is not integer');
  t.false(is.int(null), 'null is not integer');
  t.false(is.int(), 'undefined is not integer');
  t.end();
});

test('is.maximum', function (t) {
  t.true(is.maximum(3, [3, 2, 1]), '3 is maximum of [3,2,1]');
  t.true(is.maximum(3, [1, 2, 3]), '3 is maximum of [1,2,3]');
  t.true(is.maximum(4, [1, 2, 3]), '4 is maximum of [1,2,3]');
  t.true(is.maximum('c', ['a', 'b', 'c']), 'c is maximum of [a,b,c]');
  t.false(is.maximum(2, [1, 2, 3]), '2 is not maximum of [1,2,3]');
  t.throws(function () { return is.maximum(2, null); }, TypeError, 'throws when second value is not array-like');
  t.throws(function () { return is.maximum(2, {}); }, TypeError, 'throws when second value is not array-like');
  t.end();
});

test('is.minimum', function (t) {
  t.true(is.minimum(1, [1, 2, 3]), '1 is minimum of [1,2,3]');
  t.true(is.minimum(0, [1, 2, 3]), '0 is minimum of [1,2,3]');
  t.true(is.minimum('a', ['a', 'b', 'c']), 'a is minimum of [a,b,c]');
  t.false(is.minimum(2, [1, 2, 3]), '2 is not minimum of [1,2,3]');
  t.throws(function () { return is.minimum(2, null); }, TypeError, 'throws when second value is not array-like');
  t.throws(function () { return is.minimum(2, {}); }, TypeError, 'throws when second value is not array-like');
  t.end();
});

test('is.nan', function (t) {
  t.true(is.nan(NaN), 'NaN is not a number');
  t.true(is.nan('abc'), 'string is not a number');
  t.true(is.nan(true), 'boolean is not a number');
  t.true(is.nan({}), 'object is not a number');
  t.true(is.nan([]), 'array is not a number');
  t.true(is.nan(function () {}), 'function is not a number');
  t.false(is.nan(0), 'zero is a number');
  t.false(is.nan(3), 'three is a number');
  t.false(is.nan(1.1), '1.1 is a number');
  t.false(is.nan(Infinity), 'infinity is a number');
  t.end();
});

test('is.even', function (t) {
  t.true(is.even(0), 'zero is even');
  t.true(is.even(2), 'two is even');
  t.true(is.even(Infinity), 'infinity is even');
  t.false(is.even(1), '1 is not even');
  t.false(is.even(), 'undefined is not even');
  t.false(is.even(null), 'null is not even');
  t.false(is.even(NaN), 'NaN is not even');
  t.end();
});

test('is.odd', function (t) {
  t.true(is.odd(1), 'zero is odd');
  t.true(is.odd(3), 'two is odd');
  t.true(is.odd(Infinity), 'infinity is odd');
  t.false(is.odd(0), '0 is not odd');
  t.false(is.odd(2), '2 is not odd');
  t.false(is.odd(), 'undefined is not odd');
  t.false(is.odd(null), 'null is not odd');
  t.false(is.odd(NaN), 'NaN is not odd');
  t.end();
});

test('is.ge', function (t) {
  t.true(is.ge(3, 2), '3 is greater than 2');
  t.false(is.ge(2, 3), '2 is not greater than 3');
  t.true(is.ge(3, 3), '3 is greater than or equal to 3');
  t.true(is.ge('abc', 'a'), 'abc is greater than a');
  t.true(is.ge('abc', 'abc'), 'abc is greater than or equal to abc');
  t.false(is.ge('a', 'abc'), 'a is not greater than abc');
  t.false(is.ge(Infinity, 0), 'infinity is not greater than anything');
  t.false(is.ge(0, Infinity), 'anything is not greater than infinity');
  t.throws(function () { return is.ge(NaN, 2); }, TypeError, 'throws when first value is NaN');
  t.throws(function () { return is.ge(2, NaN); }, TypeError, 'throws when second value is NaN');
  t.end();
});

test('is.gt', function (t) {
  t.true(is.gt(3, 2), '3 is greater than 2');
  t.false(is.gt(2, 3), '2 is not greater than 3');
  t.false(is.gt(3, 3), '3 is not greater than 3');
  t.true(is.gt('abc', 'a'), 'abc is greater than a');
  t.false(is.gt('abc', 'abc'), 'abc is not greater than abc');
  t.false(is.gt('a', 'abc'), 'a is not greater than abc');
  t.false(is.gt(Infinity, 0), 'infinity is not greater than anything');
  t.false(is.gt(0, Infinity), 'anything is not greater than infinity');
  t.throws(function () { return is.gt(NaN, 2); }, TypeError, 'throws when first value is NaN');
  t.throws(function () { return is.gt(2, NaN); }, TypeError, 'throws when second value is NaN');
  t.end();
});

test('is.le', function (t) {
  t.true(is.le(2, 3), '2 is lesser than or equal to 3');
  t.false(is.le(3, 2), '3 is not lesser than or equal to 2');
  t.true(is.le(3, 3), '3 is lesser than or equal to 3');
  t.true(is.le('a', 'abc'), 'a is lesser than or equal to abc');
  t.true(is.le('abc', 'abc'), 'abc is lesser than or equal to abc');
  t.false(is.le('abc', 'a'), 'abc is not lesser than or equal to a');
  t.false(is.le(Infinity, 0), 'infinity is not lesser than or equal to anything');
  t.false(is.le(0, Infinity), 'anything is not lesser than or equal to infinity');
  t.throws(function () { return is.le(NaN, 2); }, TypeError, 'throws when first value is NaN');
  t.throws(function () { return is.le(2, NaN); }, TypeError, 'throws when second value is NaN');
  t.end();
});

test('is.lt', function (t) {
  t.true(is.lt(2, 3), '2 is lesser than 3');
  t.false(is.lt(3, 2), '3 is not lesser than 2');
  t.false(is.lt(3, 3), '3 is not lesser than 3');
  t.true(is.lt('a', 'abc'), 'a is lesser than abc');
  t.false(is.lt('abc', 'abc'), 'abc is not lesser than abc');
  t.false(is.lt('abc', 'a'), 'abc is not lesser than a');
  t.false(is.lt(Infinity, 0), 'infinity is not lesser than anything');
  t.false(is.lt(0, Infinity), 'anything is not lesser than infinity');
  t.throws(function () { return is.lt(NaN, 2); }, TypeError, 'throws when first value is NaN');
  t.throws(function () { return is.lt(2, NaN); }, TypeError, 'throws when second value is NaN');
  t.end();
});

test('is.within', function (t) {
  t.test('argument checking', function (st) {
    st.throws(function () { return is.within(NaN, 0, 0); }, TypeError, 'throws when first value is NaN');
    st.throws(function () { return is.within(0, NaN, 0); }, TypeError, 'throws when second value is NaN');
    st.throws(function () { return is.within(0, 0, NaN); }, TypeError, 'throws when third value is NaN');
    st.throws(function () { return is.within('', 0, 0); }, TypeError, 'throws when first value is string');
    st.throws(function () { return is.within(0, '', 0); }, TypeError, 'throws when second value is string');
    st.throws(function () { return is.within(0, 0, ''); }, TypeError, 'throws when third value is string');
    st.throws(function () { return is.within({}, 0, 0); }, TypeError, 'throws when first value is object');
    st.throws(function () { return is.within(0, {}, 0); }, TypeError, 'throws when second value is object');
    st.throws(function () { return is.within(0, 0, {}); }, TypeError, 'throws when third value is object');
    st.throws(function () { return is.within(null, 0, 0); }, TypeError, 'throws when first value is null');
    st.throws(function () { return is.within(0, null, 0); }, TypeError, 'throws when second value is null');
    st.throws(function () { return is.within(0, 0, null); }, TypeError, 'throws when third value is null');
    st.throws(function () { return is.within(undefined, 0, 0); }, TypeError, 'throws when first value is undefined');
    st.throws(function () { return is.within(0, undefined, 0); }, TypeError, 'throws when second value is undefined');
    st.throws(function () { return is.within(0, 0, undefined); }, TypeError, 'throws when third value is undefined');
    st.end();
  });
  t.true(is.within(2, 1, 3), '2 is between 1 and 3');
  t.true(is.within(0, -1, 1), '0 is between -1 and 1');
  t.true(is.within(2, 0, Infinity), 'infinity always returns true');
  t.true(is.within(2, Infinity, 2), 'infinity always returns true');
  t.true(is.within(Infinity, 0, 1), 'infinity always returns true');
  t.false(is.within(2, -1, -1), '2 is not between -1 and 1');
  t.end();
});

test('is.object', function (t) {
  t.true(is.object({}), 'object literal is object');
  t.false(is.object(), 'undefined is not an object');
  t.false(is.object(null), 'null is not an object');
  t.false(is.object(true), 'true is not an object');
  t.false(is.object(''), 'string is not an object');
  t.false(is.object(NaN), 'NaN is not an object');
  t.false(is.object(Object), 'object constructor is not an object');
  t.false(is.object(function () {}), 'function is not an object');
  t.end();
});

test('is.regexp', function (t) {
  t.true(is.regexp(/a/g), 'regex literal is regex');
  t.true(is.regexp(new RegExp('a', 'g')), 'regex object is regex');
  t.false(is.regexp(), 'undefined is not regex');
  t.false(is.regexp(function () {}), 'function is not regex');
  t.false(is.regexp('/a/g'), 'string regex is not regex');
  t.end();
});

test('is.string', function (t) {
  t.true(is.string('foo'), 'string literal is string');
  t.true(is.string(new String('foo')), 'string literal is string');
  t.false(is.string(), 'undefined is not string');
  t.false(is.string(String), 'string constructor is not string');
  var F = function () {};
  F.prototype = new String();
  t.false(is.string(F), 'string subtype is not string');
  t.end();
});

test('is.hash', function (t) {
  t.true(is.hash({}), 'empty object literal is hash');
  t.true(is.hash({ 1: 2, a: "b" }), 'object literal is hash');
  t.false(is.hash(), 'undefined is not a hash');
  t.false(is.hash(null), 'null is not a hash');
  t.false(is.hash(new Date()), 'date is not a hash');
  t.false(is.hash(new String()), 'string object is not a hash');
  t.false(is.hash(''), 'string literal is not a hash');
  t.false(is.hash(new Number()), 'number object is not a hash');
  t.false(is.hash(1), 'number literal is not a hash');
  t.false(is.hash(true), 'true is not a hash');
  t.false(is.hash(false), 'false is not a hash');
  if (typeof module !== 'undefined') {
    t.true(is.hash(module.exports), 'module.exports is a hash');
  }
  if (typeof window !== 'undefined') {
    t.false(is.hash(window), 'window is not a hash');
    t.false(is.hash(document.createElement('div')), 'element is not a hash');
  } else if (typeof process !== 'undefined') {
    t.false(is.hash(global), 'global is not a hash');
    t.false(is.hash(process), 'process is not a hash');
  }
  t.end();
});

