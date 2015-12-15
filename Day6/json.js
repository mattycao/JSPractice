/**
 * Created by caoyangkaka on 12/15/15.
 * create the json method like json.parse and json.stringify, by consider the compatibility
 * not a good one, firstly of all, it only consider the object one, not the array.
 * the for in will check the prototype property
 */
var JSONONE = (function() {
    return {
        parse: function(str) {
            try {
                return JSON.parse(str);
            } catch(e) {
                return eval('(' + str + ')');
            }
        },
        stringify: function(obj) {
            var result = '{';
            for(var attr in obj) {
                var val = obj[attr];
                if(typeof val === 'string') {
                    result += '\"' + attr + '\":\"' + obj[attr] + '\"';
                } else if(typeof val === 'number' || typeof val === 'boolean' || val === null) {
                    result += '\"' + attr + '\":' + obj[attr];
                }
                result += ',';
            }
            result = result.substr(0, result.length - 1);
            return result + '}';
        }
    }
}());

function Obj() {
    this.a = 9,
    this.b = 8,
    this.test = 'test'
};

Obj.prototype.fn  = 7;
obj = new Obj();

console.log(JSONONE.stringify(obj));