/**
 * Created by caoyangkaka on 12/23/15.
 */
var EventEmitter = require('events').EventEmitter;
var utils = require('util');

function Me(name) {
    this.name = name;
}

utils.inherits(Me, EventEmitter);

var me = new Me('Matty');

me.on('dong', function(text) {
    console.log('Get message:' + text);
});
me.emit('dong', 'Hello world');
me.removeAllListeners('dong');