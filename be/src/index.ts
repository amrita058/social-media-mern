import express, { Express, NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from "cors"
import { errorHandler } from './Users/Middleware/error'
import { env } from './config'
import userRoutes from "./Users/Routes"
import postRoutes from "./Posts/index"
import path from 'path'
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
  socket.on("disconnect",()=>{
    console.log("someone has left")
  })
});

// app.use('/uploaded', express.static('src\\Posts\\uploads'));
app.use('/uploaded', express.static(path.join(__dirname, 'Posts', 'uploads')));
app.use("/api", userRoutes())
app.use("/api",postRoutes())

app.all("*", (req: Request, res:Response,next:NextFunction) => {
    const error = new Error("Path not found")
    error.name='404'
    throw error
})

app.use(errorHandler)

server.listen(env.PORT, () => {
    console.log(`server is running at port http://localhost:${env.PORT}`);

})