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

function arrLike (ar) {
    
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