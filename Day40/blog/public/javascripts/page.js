window.onload = function() {
    var path = window.location.pathname;
    var temp = path.split('/')[3];
    var oLi = document.getElementsByClassName('pagination')[0].getElementsByTagName('li')[parseInt(temp) - 1];
    oLi.className += ' active';
};