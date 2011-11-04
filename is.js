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

    var hasOwn = {}.hasOwnProperty;

    function fun (f) {

        return typeof f === 'function'
    }

    function str (s) {
        
        return typeof s === 'string'
    }

    function ele (el) {
        
        !!(el && el.nodeType && el.nodeType == 1)
    }

    function arr (ar) {
        
        return ar instanceof Array
    }

    function arr_like (ar) {
        
        return (ar && ar.length && isFinite(ar.length))
    }

    function num (n) {
        
        return typeof n === 'number'
    }

    function bool (b) {
        
        return (b === true) || (b === false)
    }

    function args (a) {
        
        return !!(a && hasOwn.call(a, 'callee'))
    }

    function emp (o) {
        
        var p;

        if (arr(o)) { 
            return o.length === 0
        }

        if (obj(o)) {
            for (p in o) {
                return false;
            }
            return true;
        }

        return o === '';
    }

    function dat (d) {

        return !!(d && d.getTimezoneOffset && d.setUTCFullYear);
    }

    function reg (r) {

        return !!(r && r.test && r.exec && (r.ignoreCase || r.ignoreCase === false));
    }

    function nan (n) {

        return n !== n;
    }

    function nil (o) {

        return o === n;
    }

    function und (o) {

        return typeof o === 'undefined';
    }

    function def (o) {

        return typeof o !== 'undefined';
    }

    function obj (o) {

        return o instanceof Object && !fun(o) && !arr(o);
    }

    return {
        fun: fun,
        str: str,
        ele: ele,
        arr: arr,
        arr_like: arr_like,
        num: num,
        bool: bool,
        args: args,
        emp: emp,
        dat: dat,
        reg: reg,
        nan: nan,
        nil: nil,
        und: und,
        def: def,
        obj: obj
    };

}(this));