/**
 * Created by caoyangkaka on 1/19/16.
 */
function makeClosures(arr, fn) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        (function (e) {
            result.push(function () {
                    return fn.call(null, arr[e]);
                }
            );
        })(i);
    }
    return result;
}
var result = makeClosures([1, 2, 3], function (x) {
    return x * x;
});

console.log(result[0]());
console.log(result[1]());
console.log(result[2]());