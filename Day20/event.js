/**
 * Created by caoyangkaka on 12/23/15.
 */
var util = require('util');

var Event = {
}

Event.prototype.addListener = function(type, fn) {
    if(typeof fn !== 'function') {
        throw new TypeError("Must be a function.");
    }
    if(!this._events) {
        this._events = {};
    }
    if(!this._events[type]) {
        this._events[type] = [fn];
    } else {
        this._events[type].push(fn);
    }
}

Event.prototype.emit = function(type) {
    if(!this._events) {
        this._events = {};
    }
    var arg = [].slice.call(arguments, 0);
    arg.shift();
    var handler = this._events[type];
    for(var i = 0; i < handler.length; i++) {
        handler[i].apply(this, arg);
    }
}

Event.prototype.removeListener = function(type, fn) {
    if(!this._events){
        this._events = {};
    }
    var handler = this._events[type];
    for(var i = 0; i < handler.length; i++) {
        if(handler[i] === fn) {
            handler.splice(i, 1);
            i = handler.length;
        }
    }
}

Event.prototype.once = function(type, cb) {
    if(!this._events) {
        this._events = {};
    }
    var that = this;
    this.addListener(type, function fn() {
        that.removeListener(type, fn);
        cb.apply(that, arguments); // the arguments, I don't get it
    });
}
