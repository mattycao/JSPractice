/**
 * Created by caoyangkaka on 12/1/15.
 */
(function() {
    "use strict";
    var oClicks = document.getElementsByClassName('click'); // ie8 not support
    var oImgs = document.getElementsByTagName('img');
    for(var i = 0; i < oClicks.length; i++) {
        ;(function(i){
            oImgs[i].addEventListener('click', function() {
                var times = parseInt(oClicks[i].innerHTML);
                times++;
                oClicks[i].innerHTML = times;
            },false);
        }(i));

    }
}());