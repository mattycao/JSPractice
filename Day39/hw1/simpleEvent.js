function EventEmitter() {
    this._events = {};//初始化一个私有的属性
}
//type 绑定的事件名
// listen 事件发生后的监听
EventEmitter.prototype.on = EventEmitter.prototype.addListener = function (type, listener) {
    if (this._events[type]) {
        this._events[type].push(listener);
    } else {
        this._events[type] = [listener];
    }
}

// homework here
EventEmitter.prototype.once = function (type, callback) {
    var that = this;
    this.on(type, function listener() {
        that.removeListener(type, listener);
        callback.apply(that, arguments);
    });
}
EventEmitter.prototype.emit = function (type) {
    //if(this._events[type])
    //    this._events[type].forEach(function(listener){
    //        listener();
    //    });

    this._events = this._events || {};
    var args = [].slice.call(arguments, 1)
        , callbacks = this._events[type];

    if (callbacks) {
        callbacks = callbacks.slice(0);
        for (var i = 0, len = callbacks.length; i < len; ++i) {
            callbacks[i].apply(this, args);
        }
    }

    return this;
}
EventEmitter.prototype.removeListener = function (type, listener) {
    if (this._events[type]) {
        var listeners = this._events[type];
        for (var i = 0; i < listeners.length; i++) {
            if (listeners[i] === listener) {
                listeners.splice(i, 1);
                return;
            }
        }
    }

}
module.exports = EventEmitter;