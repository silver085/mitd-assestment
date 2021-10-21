const messages = require('../strings/strings.properties')
const userRepository = require("../repositories/users.repository")
const strings = require("../strings/strings.properties")

const {
    v4: uuidv4,
} = require('uuid');
let dispatchMessageToAll = function(socket, message) {
    userRepository.fetchAllUsers().forEach(u => {
        if(socket!==null) {
            if (u.uid.toString() !== socket.identifier.toString()) {
                let from = userRepository.getNickname(socket.identifier.toString())
                u.socket.write(strings.writeMsg(from, message))
            }
        }
        else
            if(!u.socket.destroyed)
            u.socket.write("[Server] " + message)
    })
}
let handleCommand = function (socket, message) {
    if(message.startsWith("/nick")){
        let split = message.split(" ")
        if(split.length > 1){
            let newNick = split[1].replace("\n", "")
            let user = userRepository.updateUser(socket.identifier, newNick)
            dispatchMessageToAll(null, strings.changedNickname(socket.identifier, user.nickName))
        } else {
            socket.write(messages.nickCmdErrorSyntax)
        }


    }
}
module.exports = {
    onConnect : (socket) => {
        let address = socket.address()
        console.log("Connection from " + address.address + "\n")
        let uuid = uuidv4()
        socket.identifier = uuid
        userRepository.createNewUser(socket, uuid)
        socket.write(messages.welcome(uuid))
        dispatchMessageToAll(null, strings.joinedRoom(socket.identifier.toString()))
    },
    onDataReceived: (socket, data) => {
        data = data.toString().replace("\n", "")
        if(data.startsWith("/")){
            handleCommand(socket, data)
        }else {
             dispatchMessageToAll(socket, data)
        }

    },
    onDisconnect: (socket) =>{
        userRepository.remove(socket.identifier)
        socket.destroy()
        dispatchMessageToAll(null , strings.abandonedRoom(socket.identifier.toString()))
    },

}
