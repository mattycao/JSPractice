/**
 * Created by caoyangkaka on 1/6/16.
 */
// the example of event handle in red book
var EventHandler = {
    addHandler: function (ele, type, fn) {
        if (ele.addEventListener) {
            ele.addEventListener(type, fn, false);
        } else if (ele.attachEvent) {
            ele.attachEvent('on' + type, fn);
        } else {
            // using the dom0
            ele['on' + type] = fn;
        }
    },
    removeHandler: function (ele, type, fn) {
        if (ele.removeEventListener) {
            ele.removeEventListener(type, fn);
        } else if (ele.detachEvent) {
            ele.detachEvent('on' + type, fn);
        } else {
            ele['on' + type] = null;
        }
    },
    getEvent: function(event) {
        return event || window.event;
    },
    getTarget: function(event) {
        return event.target || event.srcElement;
    },
    preventDefault: function(event) {
        if(event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    stopPropagation: function(event) {
        if(event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
}





