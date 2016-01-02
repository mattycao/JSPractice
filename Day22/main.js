/**
 * Created by caoyangkaka on 1/2/16.
 */
// Write a JavaScript program to find the greatest common divisor (gcd) of two positive numbers.
    // 欧几里得定理
var gcd = function (a, b) {
    if (!b) {
        return a;
    }
    return gcd(b, a % b);
};