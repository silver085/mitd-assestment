const {optional} = require("../utils/utils");

const User = require('../models/users.model')
let users = []

let createNewUser = function(socket, uid)  {
    let newUser = new User(socket, uid)
    users.push(newUser)
}
let fetchAllUsers = function(){
    return users.map((user) => { return {
        nickName: optional(user.nickName, user.uid),
        socket: user.socket,
        uid: user.uid
    }})
}
let fetchUser = (identifier) => {
    return users[getIndex(identifier)]
}
let getIndex = (identifier) => {
    let idx = users.findIndex(user => user.uid.toString() === identifier)
    return idx
}
let updateUser = (identifier, newNick) => {
    let index = getIndex(identifier)
    users[index].nickName = newNick.replace("\r", "").replace("\n", "")
    return users[index]
}
let getNickname = (identifier) => {
    let user = fetchUser(identifier)
    return optional(user.nickName, identifier)
}
let remove = (identifier) => {
    console.log("Users before remove: " + users.map(u => " |" + u.uid.toString()))
    users = users.filter(user => user.uid.toString() !== identifier.toString())
    console.log("Users after remove: " + users.map(u => " |" + u.uid.toString()))
}

module.exports = {createNewUser, fetchAllUsers, updateUser, fetchUser,
    getNickname,
    remove
}
