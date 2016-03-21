/**
 * Created by caoyangkaka on 12/24/15.
 */

/**
 * This one is a small example of get the css style value by javascript, by considering all the compatibility issues
 * @param ele, the element you want to get the style value
 * @param attr, the related values
 * @returns {number}, the return values
 * @Special: consider the opacity issue mainly
 */

function getCss(ele, attr) {
    if (!ele || !ele.nodeType || ele.nodeType === 1) {
        throw new TypeError("Wrong element type.");
    }

    if (window.getComputedStyle) {
        return parseFloat(window.getComputedStyle(ele, null)[attr]);
    } else {
        // in ie browser, for the opacity attribute
        if (attr === 'opacity') {
            var reg = /alpha\(opacity=(\d{1,3}\.\d+)\)/;
            var temp = ele.currentStyle.opacity;
            if (reg.test(temp)) {
                var val = RegExp.$1 / 100;
                if (val > 1) {
                    return 1;
                } else if (val < 0.01) {
                    return 0;
                } else {
                    // notice the toFixed return a string value
                    return parseFloat(val.toFixed());
                }
            } else {
                return 1;
            }
        }
        // not adding the else, since the ie8+ will use the standard float keywords
        return parseFloat(ele.currentStyle[attr]);
    }
}

/**
 * Will used to set the css attributes
 * @param ele, the element who will get the value
 * @param attr. the attribute name
 * @param val, the value will be assigned
 * Note: the opacity, the background, the float
 */
function setCss(ele, attr, val) {
    if (!ele || !ele.nodeType || ele.nodeType === 1) {
        throw new TypeError("Wrong element type.");
    }
    if (attr === 'opacity') {
        ele.style.opacity = val;
        ele.style.filter = 'alpha(' + Math.round(val * 100) + ')';
    } else if (attr === 'float') {
        ele.style.cssFloat = val;
        ele.style.styleFloat = val;
    } else if (/^background/.test(attr)) {
        ele.style.background = val;
    } else {
        ele.style[attr] = val;
    }
}


/**
 * The animation functions
 * @param ele
 * @param attr
 * @param target
 * @param duration
 * @param fn
 */
function animate(ele, attr, target, duration, fn) {
    // animation process: 1. the total time hw2. the initial value 3. the target value 4. the duration 5. the interval time
    clearInterval(ele.timer);
    var begin = getCss(ele, attr);
    var change = target - begin;
    if (change === 0) {
        if (typeof fn === 'function') {
            fn.call(ele);
        }
        return;
    }
    var interval = 15;
    var times = 0;

    function step() {
        times += interval;
        if (times >= duration) {
            setCss(ele, attr, target);
            clearInterval(ele.timer);
            ele.timer = null;//动画停止时把ele.timer置为null。这样ele.timer就成为判断ele这个元素是否在运动中的依据了
            //动画结束
            if (typeof fn == "function") {
                fn.call(ele);
                //fnCallback();
                //回调方法里的this，一直表示为当前运动的这个元素
            }
        } else {
            var val = times / duration * change + begin;
            setCss(ele, attr, val)
        }
    }

    ele.timer = window.setInterval(step, interval);
}

function animate(ele, obj, duration, fn) {
    if (ele.timer) {
        return;
    }
    var oBegin = {};
    var oChange = {};
    var flag = 0;
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) {
            var begin = getCss(ele, attr);
            var target = obj[attr];
            var change = target - begin;
            if (change) {
                oBegin[attr] = begin;
                oChange[attr] = change;
                flag++;
            }
        }
    }
    if (flag === 0) {
        if (typeof fn === 'function') {
            fn.call(ele);
        }
        return;
    }

    var interval = 15;
    var time = 0;

    function step() {
        time += interval;
        if (time >= interval) {
            clearInterval(ele.timer);
            ele.timer = null;
            for (var attr in oBegin) {
                setCss(ele, attr, obj[attr]);
            }
            if (typeof fn === 'function') {
                fn.call(ele);
            }
        } else {
            for (var attr in oBegin) {
                var value = oBegin[attr] + time * oChange[attr] / duration;
                setCss(ele, attr, value);
            }
        }
    }

    ele.timer = window.setInterval(step, interval);
}