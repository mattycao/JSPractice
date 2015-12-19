/**
 * Created by caoyangkaka on 12/18/15.
 */
function reverseOne(list) {
    var temp = list.concat().reverse();
    console.log(temp.join(' '));
    console.log(list.join(' '));
}

function reverseTwo(list) {
    var temp = list.concat().reverse();
    for(var i = 0; i < temp.length; i++) {
        temp[i] = [].slice.call(temp[i], 0).reverse().join('');
    }
    console.log(temp.join(' '));
    console.log(list.join(' '));
}

var list = ['I', 'has', 'a', 'good', 'day', 'today!', '12'];
reverseOne(list);
reverseTwo(list);