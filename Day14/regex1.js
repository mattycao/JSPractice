/**
 * Created by caoyangkaka on 12/19/15.
 */

// this is the one used very often, about testing the empty string input
var reg = /^\s*$/;

// the pattern recognize
reg = /(\w)(\w)\2\1/;
var str = 'woow';
console.log(reg.exec(str));

// time
reg = /(\d{4})-(\d{1,2})-(\d{1,2})\s+(\d|[01]\d|(?:2[0-3])):(\d|(?:[0-5]\d)):((?:[0-5]\d)|\d)/;
str = '2013-1-02 12:03:37';
console.log(reg.exec(str));

// replace
str = 'bbs.conmeab';
console.log(str.replace(/b/g, 'c'));

str = 'My name is {0}. I am {1} years old.';
var temp = str.replace(/{(\d)}/g, function (s, i) {
    console.log(s + ':' + i);
    console.log(arguments.length);
    for (var t = 0; t < arguments.length; t++) {
        console.log(arguments[t]);
    }
});