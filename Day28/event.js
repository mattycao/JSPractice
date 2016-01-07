/**
 * Created by caoyangkaka on 1/7/16.
 */
// the whole event stuff

/**
 * This function is used for binding
 * @param ele
 * @param type
 * @param fn
 */
function on(ele, type, fn) {
    // firstly, we handle the self defined event
    if (/^self/.test(type)) {
        if (!ele['selfEvent' + type]) {
            ele['selfEvent' + type] = [];
        }
        var temp = ele['selfEvent' + type];
        for (var i = 0; i < temp.length; i++) {
            if (temp[i] === fn) {
                return;
            }
        }
        temp.push(fn);
        return;
    }
    if (ele.attachEvent) {
        // handle the IE problem
        if (!ele['aEvent' + type]) {
            ele['aEvent' + type] = [];
            function tempFn() {
                run.call(ele);
            }

            ele.attachEvent('on' + type, tempFn);
        }
        var temp = ele['aEvent' + type];
        for (var i = 0; i < temp.length; i++) {
            if (temp[i] === fn) {
                return;
            }
        }
        temp.push(fn);

    } else if (ele.addEventListener) {
        // handle the none-IE
        ele.addEventListener(type, fn, false);
    }
}

/**
 * This one is for run for IE, solve the problem of messed order, and the compatibility problem
 */
function run() {
    var e = window.event;
    var a = this['aEvent' + type];
    e.target = e.srcElement;
    e.pageX = (document.body.scrollLeft || document.documentElement.scrollLeft) + e.clientX;
    e.pageY = (document.body.scrollTop || document.documentElement.scrollTop) + e.clientY;
    e.preventDefault = function () {
        e.returnValue = false;
    };
    e.stopPropagation = function () {
        e.cancelBubble = true;
    };
    if (a) {
        var aTemp = this['tempEvent'] = a.slice(0);
    } else {
        return;
    }
    for (var i = 0; i < aTemp.length; i++) {
        if (typeof aTemp[i] === 'function') {
            aTemp[i].call(this, e);
        } else {
            aTemp[i].splice(i, 1);
            i--;
        }
    }
}

function off(ele, type, fn) {
    // for the self defined
    if (/^self/.test(type)) {
        var a = ele['selfEvent' + type];
        if (a) {
            for (var i = 0; i < a.length; i++) {
                if (a[i] === fn) {
                    a[i] = null;
                }
            }
        }
        return;
    }
    // for IE
    if (ele.detachEvent) {
        var a = ele['aEvent' + type];
        if (a && a.length) {
            for (var i = 0; i < a.length; i++) {
                if (a[i] === fn) {
                    a[i] = null;
                    ele['tempEvent'][i] = null;
                }
            }
        }
    } else if (ele.removeEventListener) {
        ele.removeEventListener(type, fn);
    }
}

// emit function for selfEvent
function fire(type, e) {
    var a = this["selfEvent" + type];
    if (a && a.length) {
        for (var i = 0; i < a.length;) {
            if (typeof a[i] == "function") {
                a[i].call(this, e);
                i++;
            } else {
                a.splice(i, 1);
            }
        }
    }
}