import express from "express"
import {createServer} from "node:http"
import {Server} from "socket.io"


// -------------------------------------------------------------------------------------------------------------------------------------//
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer,{
    cors:{
        origin:"*"
    }
})

io.on("connection",(socket)=>{
    console.log(" ✅ user connected", socket.id);

    socket.on("message",(msg)=>{
        // send to everyone
        io.emit("message",msg)
    })
      
    socket.on("disconnect",()=>{
        console.log("❌ user disconnected", socket.id);
    })
})



app.listen(3000,()=>{
    console.log("server running on port 3000 🔌");
    
})