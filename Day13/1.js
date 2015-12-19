/**
 * Created by caoyangkaka on 12/18/15.
 */
function Records() {
    this.list = [];
    this.add = add;
    this.average = average;
}

function add(score) {
    this.list.push(score);
}

function average() {
    var total = this.list.reduce(function(a, b) {
        return a + b;
    }, 0);
    return (total / this.list.length).toFixed(2);
}

var student = new Records();
student.add(5);
student.add(5);
student.add(10);
student.add(5);
student.add(10);
student.add(5);
console.log(student.average());