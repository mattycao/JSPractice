/**
 * Created by caoyangkaka on 12/20/15.
 */
function CArray(num) {
    this.dataStore = [];
    this.pos = 0;
    this.num = num;
    this.insert = insert;
    this.toString = toString;
    this.clear = clear;
    this.setData = setData;
    this.swap = swap;

    // initialize
    for (var i = 0; i < num; i++) {
        this.dataStore[i] = i;
    }
}

function setData() {
    for (var i = 0; i < this.num; i++) {
        this.dataStore[i] = Math.floor(Math.random() * this.num + 1);
    }
}

function clear() {
    for (var i = 0; i < this.dataStore.length; i++) {
        this.dataStore[i] = 0;
    }
}

function insert(element) {
    this.dataStore[this.pos++] = element;
}

function toString() {
    var result = '';
    for (var i = 0; i < this.dataStore.length; i++) {
        result += this.dataStore[i] + ' ';
        if (i > 0 && i % 10 == 0) {
            result += '\n';
        }
    }
    return result;
}

function swap(arr, a, b) {
    var temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}


var list = new CArray(100);
list.setData();
console.log(list.toString());

// bubblesort
function bubbleSort(list) {
    var length = list.dataStore.length;
    for (var outer = length; outer > 1; outer--) {
        for (var inner = 0; inner < outer - 1; inner++) {
            if (list.dataStore[inner] > list.dataStore[inner + 1]) {
                list.swap(list.dataStore, inner, inner + 1);
            }
        }
    }
}

// selection sort
function selectSort(list) {
    var length = list.dataStore.length;
    var min;
    for(var outer = 0; outer < length -1; outer++) {
        min = outer;
        for(var inner = outer + 1; inner < length; inner++) {
            if(list.dataStore[min] > list.dataStore[inner]) {
                min = inner;
            }
        }
        list.swap(list.dataStore, min, outer);
    }
}

//insert sort
function insertSort(list) {
    var length = list.dataStore.length;
    for(var outer = 1; outer < length; outer++) {
        var tmp = list.dataStore[outer];
        var inner = outer;
        while (inner > 0 && list.dataStore[inner - 1] >= tmp) {
            list.dataStore[inner] = list.dataStore[inner - 1];
            --inner;
        }
        list.dataStore[inner] = tmp;
    }
}

console.log('After Sort:');
insertSort(list);
console.log(list.toString());
