const chatController = require("./controllers/server.controller")

console.log("Starting simple telenet server...")
chatController.ChatServer(10000, 1000)
chatController.StartServer()
console.log("Server listening on port " + chatController.port)
