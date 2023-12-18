import express, { Express, NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from "cors"
import { errorHandler } from './Middleware/error'
import { env } from './config'
import userRoutes from "./Users/Routes"
import postRoutes from "./Posts/Routes"
import path from 'path'
import { connectDB } from './database'
import { CustomError } from './libs'
const socketIo = require('socket.io');
const http = require('http');

const app:Express = express()

app.use(bodyParser.json())
app.use(cors())

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket:any) => {
  io.emit("fromserver","Hello from server")
    console.log("someone connected",socket.id)

  socket.on('fromclient', (message:any) => {
    console.log('Received message from client:', message);
  })

  socket.on('sendNotification',(data:any)=>{
    console.log('Received message from user:', data);
    if(data.user.userName !== data.receiver){
      io.emit('getNotification',data)
    }
  })

  socket.on("disconnect",()=>{
    console.log("someone has left")
  })
});

connectDB()
app.use('/uploaded', express.static(path.join(__dirname, 'uploads')));
app.use("/api", userRoutes())
app.use("/api",postRoutes())

app.all("*", (req: Request, res:Response,next:NextFunction) => {
    const error = new CustomError("Path not found",404)
    error.name='not found'
    throw error
})

app.use(errorHandler)

server.listen(env.PORT, () => {
    console.log(`server is running at port http://localhost:${env.PORT}`);

})