/**
 * Created by caoyangkaka on 1/20/16.
 */
function partialUsingArguments(fn) {
    var arg1 = [].slice.call(arguments, 1);
    return function () {
        var arg2 = [].slice.call(arguments, 0);
        return fn.apply(null, arg1.concat(arg2));
    }
}

var a = 1;
var b = 2;
var c = 3;
var d = 4;
var test = function (first, second, third, forth) {
    return first + second + third + forth;
};
console.log(partialUsingArguments(test, a, b)(c, d));
