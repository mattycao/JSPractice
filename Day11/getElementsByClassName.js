/**
 * Created by caoyangkaka on 12/17/15.
 */

/**
 *
 * @param cType, the class which you want to find
 * @param context, the this context environment
 */
function getElementsByClassName(cType, context) {
    if(typeof cType == 'undefined') {
        return [];
    }
    context = context || document;
    try {
        // if we have the method
        return context.getElementsByClassName(cType);
    } catch(e) {
        // if not then
        var reg = new RegExp("'\\b' + cType + '\\b'");
        var oList = context.getElementsByTagName('*');
        var result = [];
        for(var i = 0; i < oList.length; i++) {
            if(reg.test(oList[i].className)) {
                result.push(oList[i]);
            }
        }
        return result;
    }
}