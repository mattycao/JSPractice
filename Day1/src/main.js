/**
 * Created by caoyangkaka on 12/1/15.
 */
(function() {
    "use strict";
    var oClick = document.getElementById('click');
    var oImg = document.getElementsByTagName('img')[0];
    oImg.addEventListener('click', function() {
        var times = parseInt(oClick.innerHTML);
        times++;
        oClick.innerHTML = times;
    }, false);
}());