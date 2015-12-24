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