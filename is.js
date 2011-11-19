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

    function arguments (self) {
        
        return to_string.call(self) === '[object Arguments]';
    }

    function array (self) {
        
        return to_string.call(self) === '[object Array]'; 
    }

    function arraylike (self) {
        
        return (self && self.length && is_finite(self.length));
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

    function element (self) {
        
        return !!(self && self.nodeType && self.nodeType === 1);
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

    function nan (self) {

        return self !== self;
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

    function empty (self) {
        
        var key;

        if (array.call(self) || arraylike.call(self) || arguments.call(self)) { 
            return self.length === 0;
        }

        if (object.call(self)) {
            for (key in self) {
                if (owns.call(self, key)) {
                    return false;
                }
            }
            return true;
        }

        if (string.call(self)) {
            return self === '';
        }

        return false;
    }

    return {
        args: arguments,
        arguments: arguments,
        array: array,
        arraylike: arraylike,
        bool: bool,
        date: date,
        def: def,
        element: element,
        err: error,
        error: error,
        func: func,
        integer: integer,
        nan: nan,
        nil: nil,
        num: number,
        number: number,
        obj: object,
        object: object,
        regex: regex,
        str: string,
        string: string,
        undef: undef,
        empty: empty
    };

}(this));