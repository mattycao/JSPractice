/**
 * Created by caoyangkaka on 1/18/16.
 */

/**
 * remove the value in the array
 * @param arr
 * @param item
 * @returns {*|Blob|ArrayBuffer|Array.<T>|string|Buffer}
 */
function remove(arr, item) {
    var result = arr.slice(0);
    for(var i = 0; i < arr.length;) {
        if(result[i] === item) {
            result.splice(i, 1);
        } else {
            i++;
        }
    }
    return result;
}

// actually, if we trace it in a reverse order, then we don't need care about hte i++ or i-- order

function remove(arr, item) {
    return arr.filter(function(value) {
        return value !== item;
    })
}