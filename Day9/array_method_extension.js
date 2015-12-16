/**
 * Created by caoyangkaka on 12/16/15.
 */

// a simple way to implement the slice function in array
Array.prototype.sliceOne = function(s, e) {
    // remember the array will do the shallow copy, so
    var result = [];
    for(var i = s; i < e; i++) {
        result.push(this[i]);
    }
    return result;
}

// distinct function, use the hashtable
Array.prototype.distinct = function() {
    var obj = {};
    for(var i = 0; i < this.length; i++) {
        if(obj[this[i]] !== this[i]) {
            obj[this[i]] = this[i];
        } else {
            this.splice(i, 1);
            i--;
        }
    }
}

var a = [1, 2, 2, 1, 1];
a.distinct();
console.log(a);

// listToArray
function listToArray(list) {
    return Array.prototype.slice.call(list, 0);
}

function listToArray1(list) {
    try {
        return Array.prototype.slice.call(list, 0);
    } catch(e) {
        var result = [];
        for(var i = 0; i < list.length; i++) {
            result.push(list[i]);
        }
        return result;
    }
}

// stringToArray
function stringToArray(str) {
    return str.split('');
}

function stringToArray1(str) {
    return [].slice.call(str, 0);
}

var word = 'spend-time';
console.log(stringToArray(word));

//StringToArray then do the distinct
function stringDistinct(str) {
    var aList = stringToArray(str);
    var obj = {};
    var result = [];
    for(var i = 0; i < aList.length; i++) {
        var temp = aList[i];
        if(!obj.hasOwnProperty(temp)) {
            obj[temp] = 1;
            result.push(aList[i]);
        } else {
            obj[temp]++;
        }
    }
    return result.join('');
}

console.log(stringDistinct(word));

//clone function for array
Array.prototype.clone = function() {
    return this.slice(0);
}