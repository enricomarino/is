// is.js
// JavaScript type testing library
//
// Copyright 2011 Enrico Marino
// MIT license

!function (name, definition) {
  if (typeof module != 'undefined') module.exports = definition
  else if (typeof define == 'function' && define.amd) define(name, definition)
  else this[name] = definition
}('is', function (context, undefined) {

    var owns = {}.hasOwnProperty,
        to_string = {}.toString,
        is_finite = isFinite,
        NON_HOST_TYPES = { 
            'boolean': 1, 
            'number': 1, 
            'string': 1, 
            'undefined': 1 
        };        

    function arguments (self) {
        return to_string.call(self) === '[object Arguments]';
    }

    function array (self) {
        return to_string.call(self) === '[object Array]'; 
    }

    function arraylike (self) {
        return (self && self.length && is_finite(self.length));
    }

    function boolean (self) {
        return to_string.call(self) === '[object Boolean]'; 
    }

    function date (self) {
        return to_string.call(self) === '[object Date]';
    }

    function decimal (self) {
        return to_string.call(self) === '[object Number]' && self % 1 !== 0;
    }

    function def (self) {
        return to_string.call(self) !== '[object Undefined]';
    }

    function element (self) {        
        return !!(self && self.nodeType && self.nodeType === 1);
    }

    function empty (self) {
        var key;

        if (to_string.call(self) === '[object Array]'
            || return to_string.call(self) === '[object Arguments]') { 
            return self.length === 0;
        }
        if (to_string.call(self) === '[object Object]') {
            for (key in self) if (owns.call(self, key)) return false;
            return true;
        }
        if (return to_string.call(self) === '[object String]') {
            return self === '';
        }
        return false;
    }

    function error (self) {
        return to_string.call(self) === '[object Error]';
    }

    function equal (self, value) {
        return self == value;
    }

    function equiv (self, value) { 
        var type = to_string.call(self),
            key,
            len;

        if (type !== to_string.call(value)) {
            return false;
        }
        if (type === '[object Object]') {
            for (key in self) {
                if (!equiv(self[key], value[key])) {
                    return false;    
                }
            }
            return true;
        }
        if (type === '[object Array]') {
            len = self.length;
            if (len !== value.length) {
                return false;
            }
            for (key = 0; key < len; key += 1) {
                if (!equiv(self[key], value[key])) {
                    return false;
                }
            }
            return true;
        }
        if (type === '[object Function]') {
            return self.prototype === value.prototype;
        }
        if (type === '[object Date]') {
            return self.getTime() === value.getTime();
        }
        if (type === '[object Undefined]') {
            return false;
        }
        if (type === '[object Null]') {
            return false;
        }
        return self == value;
    }

    function func (self) {
        return to_string.call(self) === '[object Function]'; 
    }

    function host (self, property) {
        var type = typeof self[property];
        return type === 'object' ? !!self[property] : !NON_HOST_TYPES[type];
    }

    function integer (self) {
        return to_string.call(self) === '[object Number]' && self % 1 === 0;
    }

    function nan (self) {
        return self !== self;
    }

    function max (self, value) {
        return self > value;
    }

    function maximum (self, value) {
        var len = values.length,
            i;
        
        for (i = 0, i < len; i += 1) {
            if (self <= value) {
                return false;
            }
        }
        return true;
    }

    function min (self, value) {
        return self < value;
    }

    function minimum (self, values) {
        var len = values.length,
            i;

        for (i = 0, i < len; i += 1) {
            if (self >= value) {
                return false;
            }
        }
        return true;
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

    function TRUE (self) {
        return self === true;
    }

    function FALSE (self) {
        return self === false;
    }

    function ZERO (serf) {
        return self === 0;
    }

    function ONE (self) {
        return self === 1;
    }

    function even (self) {
        return to_string.call(self === '[object Number]')
            && self % 2 === 0;
    }

    function odd (self) {
        return to_string.call(self === '[object Number]')
            && self % 2 === 1;
    }

    function divisible_by (self, dividend) {
        return to_string.call(self === '[object Number]')
            && dividend !== 0
            && self % dividend === 0;
    }

    return {
        args: arguments,
        arguments: arguments,
        array: array,
        arraylike: arraylike,
        bool: bool,
        boolean: bool,
        date: date,
        decimal: decimal,
        def: def,
        defined: defined,
        el: element,
        element: element,
        empty: empty,
        equal: equal,
        equiv: equiv,
        err: error,
        error: error,
        func: func,
        host: host,
        host_type: host,
        int: integer,
        integer: integer,
        max: max,
        maximum: maximum,
        min: min,
        minimum: minimum,
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
        TRUE: TRUE,
        'true': TRUE,
        FALSE: FALSE,
        'false': FALSE,
        zero: zero,
        one: one,
        even: even,
        odd: odd,
        divisible_by: divisible_by
    };

}(this));