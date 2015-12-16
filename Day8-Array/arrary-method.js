/**
 * Created by caoyangkaka on 12/16/15.
 */
    // 1.concat, 2. pop, shift, push, unshift 3. sort, reverse 4. slice, splice, 5. toString, indexOf, join

// notice the concat will produce a new array, which is a good way to produce a new array
var arr1 = [1, 2, 3, 4];
var arr2 = [5, 6, 7, 8];
var result1 = arr1.concat(arr1, arr2);
console.log(result1);
// pop, shift, will return the success one, if not, will only return undefined

// here, for the slice, so
var result2 = result1.slice(1, 2);
console.log(result2);
result2[0] = 1;
console.log(result1);
console.log(result2);
// slice does not alter. It returns a shallow copy of elements from the original array. Notice, it only for return the object, it will has something tricks.

// reverse will change the original array

// for the iteration method
// for the forEach
if(!Array.prototype.forEach) {
    Array.prototype.forEach = function(fn, context) {
        var length = this.length;
        var context = arguments[1];
        if(typeof fn !== 'function') {
            throw new Error('Please type in the right function');
        }
        for(var i = 0; i < length; i++) {
            fn.call(context, this[i], i, this);
        }
    }
}

// every, make sure every one is correct
var result3 = result1.every(function(item, index, array) {
    return item > 2;
});
console.log(result3);

// filter, return the true one
var result4 = result1.filter(function(item, index, array) {
    return item > 2;
});
console.log(result4);

// forEach, has no return, only process the item in the function

// map, will produce a new item based on the new function
var result5 = result1.map(function(item) {
    return item * 2;
});
console.log(result5);

// some, like the every, but using the or operation

// shrink function, reduce, will return a value by give a function and a initial value
var result6 = result1.reduce(function(x, y) {
    return x * y;
}, 0);
console.log(result6);
// reduceRight will get the value from the higher index to the lower index
