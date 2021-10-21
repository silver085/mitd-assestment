const net = require("net")
const {optional} = require("../utils/utils")
const listeners = require("./server.listeners")

module.exports = {
    port: 10000,
    maxConnections: 500,
    initialized: false,
    server: null,

    ChatServer: (port, maxConnections) => {
        this.port = optional(port, 10000)
        this.maxConnections = optional(maxConnections, 500)
        this.server = net.createServer((socket) => {

            listeners.onConnect(socket)

            socket.on("data", (data) => {

                listeners.onDataReceived(socket, data)
            });
            socket.on("close", () => {
                listeners.onDisconnect(socket)
            })

        });
        this.server.maxConnections = maxConnections
       return this
    },
    StartServer: () => {
        if (this.server) {
            this.server.listen(this.port)
        } else {
            throw "Error, must be first initialized"
        }
    },

}
