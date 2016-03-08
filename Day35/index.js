$(function () {
    var octopus = {
        init: function () {
            ajax.init();
            view.init();
        }
    };
    var view = {
        // here are all the event adding process
        init: function () {
            var regBtn = $('#regBtn');
            regBtn.click(function (e) {
                var user = {
                    username: $('#formUserName').val(),
                    age: $('#formUserAge').val()
                };
                ajax.post('/register', JSON.stringify(user));
            });
            var searchBtn = $('#searchBtn');
            searchBtn.click(function (e) {
                var username = $('#formUserName').val();
                ajax.get('/search' + '?username=' + username);
            });
            var updateBtn = $('#updateBtn');
            updateBtn.click(function (e) {
                var user = {
                    username: $('#formUserName').val(),
                    age: $('#formUserAge').val()
                };
                ajax.post('/update', JSON.stringify(user));
            });
            var deleteBtn = $('#deleteBtn');
            deleteBtn.click(function (e) {
                var username = $('#formUserName').val();
                ajax.get('/delete' + '?username=' + username);
            });
            var path = window.location.pathname;
            if (path === '/' || path === '/spa.html') {
                ajax.get('/all');
            }
        },
        renderTable: function(users) {
            var $table = $('table.table tbody');
            var htmlStr = '';
            users.forEach(function(user, index) {
                htmlStr += '<tr>'+
                        '<th scope="row">' + (++index)  + '</th>' +
                        '<td>'+ user.username + '</td>' +
                        '<td>'+ user.age + '</td>' +
                        '</tr>';
            });
            $table.html(htmlStr);
        }
    };

    var ajax = {
        init: function () {
            this.xhr = new XMLHttpRequest();
        },
        get: function (url) {
            var xhr = this.xhr;
            xhr.open('get', url, true);
            xhr.responseType = 'json';
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        var user = xhr.response;
                        console.log(user);
                        if (url === '/all') {
                            view.renderTable(user);
                        } else {
                            var box = document.querySelector('.info');
                            if (user) {
                                box.innerHTML = JSON.stringify(user);
                            } else {
                                box.innerHTML = 'empty';
                            }
                        }

                    }
                }
            };
            xhr.send();
        },
        post: function (url, data) {
            var xhr = this.xhr;
            xhr.open('POST', url, true);
            xhr.responseType = 'json';
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        var user = xhr.response;
                        var box = document.querySelector('.info');
                        console.log(user);
                        if (user) {
                            box.innerHTML = user.username + ',' + user.age;
                        } else {
                            box.innerHTML = '';
                        }
                    } else {
                    }
                }
            };
            xhr.send(data);
        }
    };

    octopus.init();
});