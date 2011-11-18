// is.js
// JavaScript type testing library
//
// Copyright 2011 Enrico Marino
// MIT license

!function (name, definition) {
  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function' && define.amd) define(name, definition)
  else this[name] = definition()
}('is', function (context, undefined) {

    var owns = {}.hasOwnProperty,
        to_string = {}.toString,
        is_finite = isFinite;

    function array (self) {
        
        return to_string.call(self) === '[object Array]'; 
    }

    function boolean (b) {
        
        return to_string.call(self) === '[object Boolean]'; 
    }

    function date (self) {

        return to_string.call(self) === '[object Date]';
    }

    function def (self) {

        return to_string.call(self) !== '[object Undefined]';
    }

    function error (self) {
        
        return to_string.call(self) === '[object Error]';
    }

    function func (self) {

        return to_string.call(self) === '[object Function]'; 
    }

    function integer (self) {
        
        return to_string.call(self) === '[object Number]' && self % 1 === 0;
    }

    function nil (self) {

        return to_string.call(self) === '[object Null]';
    }

    function number (self) {
        
        return to_string.call(self) === '[object Number]'; 
    }

    function object (self) {

        return to_string.call(self) === '[object Object]';
    }

    function regex (self) {

        return to_string.call(self) === '[object RegExp]';
    }

    function string (self) {
        
        return to_string.call(self) === '[object String]'; 
    }

    function undef (self) {

        return to_string.call(self) === '[object Undefined]';
    }

    function arraylike (self) {
        
        return (self && self.length && is_finite(self.length));
    }

    function element (self) {
        
        return !!(self && self.nodeType && self.nodeType === 1);
    }

    function empty (self) {
        
        var p;

        if (is_array.call(self)) { 
            return self.length === 0;
        }

        if (is_object.call(self)) {
            for (p in self) {
                if (owns.call(self, p)) {
                    return false;
                }
            }
            return true;
        }

        if (is_string.call(self)) {
            return self === '';
        }

        return false;
    }

    function nan (self) {

        return self !== self;
    }

    return {
        array: array,
        bool: bool,
        date: date,
        def: def,
        err: error,
        error: error,
        func: func,
        integer: integer,
        num: number,
        number: number,
        obj: object,
        object: object,
        regex: regex,
        str: string,
        string: string,
        nil: nil,
        undef: undef,
        arraylike: arraylike,
        element: element,
        empty: empty,
        nan: nan
    };

}(this));