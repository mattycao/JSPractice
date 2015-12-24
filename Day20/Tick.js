/**
 * Created by caoyangkaka on 12/23/15.
 */
var EventEmitter = require('events').EventEmitter;
var utils = require('util');

function Tick() {
    var that = this;
    var i = 0;
    setInterval(function() {
        that.emit('Tick', ++i);
    }, 1000);
}

utils.inherits(Tick, EventEmitter);

//client
var tick = new Tick();
tick.on('Tick', function(times) {
    console.log('Tick ' + times + '.');
});