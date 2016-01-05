/**
 * Created by caoyangkaka on 1/5/16.
 */
// the bind function about event
// here, solving the compatibility problem, then the this problem
function bind(ele, type, fn) {
    if(ele.addEventListener) {
        ele.addEventListener(type, fn, false);
    } else if(ele.attachEvent) {
        if(!ele['aBind' + type]) {
            ele['aBind' + type] = []; // for store the events
        }
        var fnBind = function() {
            fn.call(ele);
        }
        fnBind.photo = fn;
        // the same function cannot be bind in the same element
        for(var i = 0; i < ele['aBind' + type].length; i++) {
            if(ele['aBind' + type][i].photo === fn) {
                return;
            }
        }
        ele['aBind' + type].push(fnBind);
        ele.attachEvent('on' + type, fnBind);
    }
}

function unBind(ele, type, fn) {
    if(ele.removeEventListener) {
        ele.removeEventListener(ele, type, fn);
    } else if(ele.detachEvent) {
        // for IE
        var temp = ele['aBind' + type];
        if(a) {
            for(var i = 0; i < temp.length; i++) {
                if(a[i].photo === fn) {
                    ele.detachEvent('on' + type, a[i]);
                    a[i] = null;
                    return;
                }
            }
        }
    }

}