/**
 * Created by caoyangkaka on 12/23/15.
 */
var DOM = (function () {
    "use strict";
    var DOM = {};

    /**
     *
     * Get all the element children for the specific node type
     * @param obj, the parent object
     * @param node, the nodetype you want to get
     * @returns {Array}, the children nodes
     */
    function getEleChildren(obj, node) {
        var result = [];
        var oChilds = obj.childNodes;
        if (node && node.nodeType == 1) {
            for (var i = 0; i < oChilds.length; i++) {
                // tagName is the same as the nodeName
                if (oChilds[i].nodeType === 1 && oChilds[i].tagName === node.toUpperCase()) {
                    result.push(oChilds[i]);
                }
            }
        } else {
            for (var i = 0; i < oChilds.length; i++) {
                if (oChilds[i].nodeType === 1) {
                    result.push(oChilds[i]);
                }
            }
        }
        return result;
    }

    /**
     *
     * Get the next element sibling
     * @param ele, get the next element of this node
     * @returns {*}
     */
    function next(ele) {
        if (!ele) {
            throw new Error('Empty Element Object');
        }
        if (ele.nextElementSibling) {
            return ele.nextElementSibling;
        }
        // not standard browser
        var n = ele.nextSibling;
        while (n) {
            if (n.nodeType === 1) {
                return n;
            }
            n = n.nextSibling;
        }
        return null;
    }

    /**
     *
     * Get the previous Sibling
     * @param ele, get the previous element node
     * @returns {*}
     */
    function prev(ele) {
        if (!ele) {
            throw new Error('Empty Element Object');
        }
        if (ele.previousElementSibling) {
            return ele.previousElementSibling;
        } else {
            // not a standard browser
            var prev = ele.previousSibling;
            while (prev) {
                if (prev.nodeType === 1) {
                    return prev;
                }
                prev = prev.previousSibling;
            }
            return null;
        }
    }

    /**
     * Get all the siblings of the element
     * @param ele
     * @returns {Array}
     */
    function siblings(ele) {
        if (!ele || ele.nodeType !== 1) {
            throw new Error('Wrong element Type');
        }
        var result = [];
        if (ele.parentNode) {
            var oNodes = ele.parentNode.childNodes;
            for (var i = 0; i < oNodes.length; i++) {
                if (oNodes[i].nodeType === 1 && oNodes[i] !== ele) {
                    result.push(oNodes[i]);
                }
            }
        }
        return result;
    }

    /**
     * Get the all the previous siblings
     * @param ele, the element
     * @returns {Array}
     */
    function prevSiblings(ele) {
        if (!ele || ele.nodeType !== 1) {
            throw new Error('Wrong element Type');
        }
        var result = [];
        if (ele.parentNode) {
            var oNodes = ele.parentNode.childNodes;
            for (var i = 0; i < oNodes.length; i++) {
                if (oNodes[i] !== ele && oNodes[i].nodeType === 1) {
                    result.push(oNodes[i]);
                } else if (oNodes[i] === ele) {
                    return result;
                }
            }
        }
        return result;
    }

    /**
     * Get the all the next siblings
     * @param ele, the element
     * @returns {Array.<node>}
     */
    function nextSiblings(ele) {
        if (!ele || ele.nodeType !== 1) {
            throw new Error('Wrong element Type');
        }
        var result = [];
        if (ele.parentNode) {
            var oNodes = ele.parentNode.childNodes;
            for (var i = oNodes.length - 1; i >= 0; i--) {
                if (oNodes[i] !== ele && oNodes[i].nodeType === 1) {
                    result.push(oNodes[i]);
                } else if (oNodes[i] === ele) {
                    return result.reverse();
                }
            }
        }
        return result.reverse();
    }

    /**
     * Get the elementsByClassName
     * @param type, the class list
     * @param context, the this key word object
     * @returns {*}
     */
    function getElemByClassName(type, context) {
        context = context || document;
        // trim the type
        var regTrim = /^\s+|\s$/g;
        type = type.replace(regTrim, '');
        if (context.getElementsByClassName) {
            return context.getElementsByClassName(type);
        } else {
            var typeList = type.split(/\s+/);
            var elems = context.getElementsByTagName('*');
            var result = [];
            for (var i = 0; i < elems.length; i++) {
                var target = elems[i];
                for (var j = 0; j < typeList.length; j++) {
                    // not a good way, think about it
                    var reg = new RegExp('(?:/^|\\b)' + className + '(?:\\b|$)/');
                    if (reg.test(target.className)) {
                        result.push(target);
                    }
                }
            }
            return result;
        }
    }

    /**
     * Add the className to one element
     * @param ele, the Target element
     * @param className, the className we want to add
     */
    function addClass(ele, className) {
        if (ele && ele.nodeType === 1 && className && typeof className === 'string') {
            var reg = new RegExp('(?:/^|\\b)' + className + '(?:\\b|$)/');
            if (!reg.test(className)) {
                ele.className += ' ' + className;
            }
        }
    }

    /**
     * Remove the className to one element
     * @param ele, the Target element
     * @param className, the className we want to delete
     */
    function removeClass(ele, className) {
        if (ele && ele.nodeType === 1 && className && typeof className === 'string') {
            var reg = new RegExp('(?:/^|\\b)' + className + '(?:\\b|$)/', 'g');
            ele.className.replace(reg, '');
        }
    }

    /**
     * Get the index number of the item in a list
     * @param ele, the element
     * @returns {number}, the index
     */
    function getIndex(ele) {
        if (!ele && ele.nodeType !== 1) {
            throw new Error('Wrong element Type');
        }
        var n = 0;
        var prev = ele.previousSibling;
        var nodeN = ele.tagName;
        while (prev) {
            if (prev.nodeType === 1 && prev.tagName === nodeN) {
                n++;
            }
            prev = prev.previousSibling;
        }
        return n;
    }

    /**
     *
     * @param ele, the target element
     * @returns {string}, the returned type
     */
    function type(ele) {
        return Object.prototype.toString.call(ele).replace(/^\[object (.+)\]$/, "$1").toLowerCase();
    }

    DOM.getElemChildren = getEleChildren;
    DOM.next = next;
    DOM.prev = prev;
    DOM.siblings = siblings;
    DOM.prevSiblings = prevSiblings;
    DOM.nextSiblings = nextSiblings;
    DOM.getElemByClassName = getElemByClassName;
    DOM.addClass = addClass;
    DOM.removeClass = removeClass;
    DOM.getIndex = getIndex;
    DOM.type = type;
    return DOM;
}());


console.log(DOM.type([]));