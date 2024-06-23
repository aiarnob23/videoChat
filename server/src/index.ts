// import { Request, Response } from "express";



// const express = require("express");
// const cors = require('cors');
// const app = express();
// app.use(cors());


const { Server } = require("socket.io");

const io = new Server(3000,{
    cors:true,
})

const emailToSocketIdMap: any = new Map();
const socketIdToEmailMap: any = new Map();


io.on("connection", (socket : any) => {
    console.log(`Socket connected : ${socket.id}`);
    socket.on("room:join", (data : any) => {
        const { email, room } = data;
        emailToSocketIdMap.set(email, socket.id);
        socketIdToEmailMap.set(socket.id, email);
        io.to(room).emit("user:joined", { email, id: socket.id });
        socket.join(room);
        io.to(socket.id).emit("room:join", data);
    })

    socket.on("user:call", ({ to, offer }) => {
        io.to(to).emit('incomming:call', { from: socket.id, offer });
    })

    socket.on("call:accepted", ({ to, ans }) => {
        io.to(to).emit("call:accepted", { from: socket.id, ans });
    })

      socket.on("peer:nego:needed", ({ to, offer }) => {
        io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
      });
    
     socket.on("peer:nego:done", ({ to, ans }) => {
       io.to(to).emit("peer:nego:final", { from: socket.id, ans });
     });

})







// app.get("/", (req:Request, res:Response) => {
//   res.send("Live Chat App Server");
// });

