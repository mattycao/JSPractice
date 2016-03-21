$(function () {
    // controller
    var model = {
        init: function () {
            this.xhr = new XMLHttpRequest();
        },
        ajax: function ajax(option) {
            var xhr = this.xhr;
            xhr.open(option.method, option.url, true);
            xhr.responseType = option.responseType;
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        option.success(xhr.response);
                    }
                    else {
                        option.error(xhr.response);
                    }
                }
            };
            xhr.send(option.data);
        }
    };

    // starter
    var starter = {
        init: function () {
            model.init();
            view.init();
        }
    };

    // view
    var view = {
        // here are all the event adding process
        init: function () {
            var renderUsers = this.renderUsers;
            var renderReg = this.renderReg;
            var renderEdit = this.renderEdit;
            var renderDelete = this.renderDelete;
            model.ajax({
                url: "/user",
                method: "GET",
                responseType: "json",
                success: function (data) {
                    if (data.code === 0) {
                        renderUsers(data.data);
                        renderReg();
                        renderEdit();
                        renderDelete();
                    } else {
                        alert(data.msg);
                    }
                },
                error: function (err) {
                    alert(err);
                },
                data: ''
            });
        },
        renderReg: function () {
            $('#add').click(function (e) {
                var user = {
                    username: $('#username').val(),
                    age: $('#age').val()
                };
                model.ajax({
                    url: "/user",
                    method: "POST",
                    responseType: "json",
                    success: function (data) {
                        if (data.code === 0) {
                            alert("Add Success!");
                            window.location.reload();
                        } else {
                            alert(data.msg);
                        }
                    },
                    error: function (err) {
                        alert(err);
                    },
                    data: JSON.stringify(user)
                });
            });
        },
        renderEdit: function () {
            var editBtn = $('.edit');
            var regBtn = $('#add');
            editBtn.click(function () {
                var index = $(this).attr('index');
                var temp = $('tr[index="' + index + '"] td');
                $('#username').val(temp[0].innerHTML);
                regBtn.remove();
                var subEditBtn = $('<button type="button" class="btn btn-primary" id="submitEdit">Edit</button>');
                $('#form').append(subEditBtn);
                $('#age').focus();
                subEditBtn.click(function () {
                    model.ajax({
                        url: "/user",
                        method: "PUT",
                        responseType: "json",
                        success: function (data) {
                            if (data.code === 0) {
                                alert("Update Success!");
                                window.location.reload();
                            } else {
                                alert(data.msg);
                            }
                        },
                        error: function (err) {
                            alert(err);
                        },
                        data: JSON.stringify({username: $('#username').val(), age: $('#age').val()})
                    });
                });
            });
        },
        renderDelete: function () {
            var deleteBtn = $('.delete');
            deleteBtn.click(function () {
                var index = $(this).attr('index');
                console.log(index);
                var temp = $('tr[index="' + index + '"] td');
                var name = temp[0].innerHTML;
                console.log(name);
                if (confirm("Really want to delete：" + name + "")) {
                    model.ajax({
                        url: "/user?username=" + name,
                        method: "DELETE",
                        responseType: "json",
                        success: function (data) {
                            if (data.code === 0) {
                                alert("Delete Success!");
                                window.location.reload();
                            } else {
                                alert(data.msg);
                            }
                        },
                        error: function (err) {
                            alert(err);
                        },
                        data: ""
                    });
                }
            });
        },
        renderUsers: function (users) {
            var htmlStr = '';
            users.forEach(function (user, index) {
                var ind = index;
                htmlStr += '<tr ' + 'index="' + ind + '">' +
                    '<th scope="row">' + (++index) + '</th>' +
                    '<td>' + user.username + '</td>' +
                    '<td>' + user.age + '</td>' +
                    '<td><button type="button" class="btn btn-info edit" index="' + ind + '">Edit</button>' +
                    '<button type="button" class="btn btn-warning col-sm-offset-1 delete" index="' + ind + '">Remove</button>' +
                    '</td>' +
                    '</tr>';
            });
            $('table.table tbody').html(htmlStr);
        }
    };

    // start the project
    starter.init();
});