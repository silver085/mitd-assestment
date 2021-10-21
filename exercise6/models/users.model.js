class UsersModel {
    constructor(socket, uid) {
        this.socket = socket
        this.uid = uid
        this.nickName = null
    }
}

module.exports = UsersModel
