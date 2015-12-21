/**
 * Created by caoyangkaka on 12/21/15.
 */
var str1 = '2012-04-06 12:30:30';
// use as many ways you can
// method 1: using the split
console.log(str1.split(/[-\s:]/));
// method 2: exec method from regex
var reg = /\d+/g;
var result = null;
while((result = reg.exec(str1))!= null) {
    console.log(result);
}
// method 3:
result = [];
reg = /\d+/g;
str1.replace(reg, function(str) {
    result.push(str);
});
console.log(result);