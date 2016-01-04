/**
 * Created by caoyangkaka on 1/4/16.
 */
// Write a JavaScript function to format a number up to specified decimal places.
function decimals(n, d) {
    if ((typeof n !== 'number') || (typeof d !== 'number'))
        return false;
    n = parseFloat(n) || 0;
    return n.toFixed(d);
}