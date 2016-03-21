function user() {
}
user.users = [];

user._isExist = function (userName) {
    return this.users.some(function (user) {
        return user.username === userName;
    });
};

user.regUser = function(newUser) {
    if(!this._isExist(newUser.username)) {
        this.users.push(newUser);
        return true;
    } else {
        return false;
    }
}

user.deleteUser = function (userName) {
    var users = this.users;
    for (var i = 0; i < users.length; i++) {
        if (users[i].username === userName) {
            users.splice(i, 1);
            return true;
        }
    }
    return false;
};

user.queryUser = function (userName) {
    return this.users.find(function (user) {
        return user.username === userName;
    });
};

user.updateUser = function (newUser) {
    var temp = this.users.find(function (user) {
        return user.username === newUser.username;
    });
    if (temp) {
        temp.age = newUser.age;
        return true;
    } else {
        return false;
    }
}
module.exports = user;