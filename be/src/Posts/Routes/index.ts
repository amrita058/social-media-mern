import { Router } from "express";
const jwt = require("jsonwebtoken")

import * as PostController from '../Controller'
// import { Request, Response } from 'express';
// import { env } from "process";
import { verifyJwt } from "../../Middleware/user";
import { upload } from "../../Middleware/multer";
// const multer = require('multer');

declare module 'express' {
    export interface Request {
      user?: any;
      file?:any;
    }
  }

// const storage = multer.diskStorage({
//   destination: (req: Request, file: any, cb:any) => {
//     cb(null, './src/uploads');
//   },
//   filename: (req: Request, file:any, cb:any) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 1024 * 1024 }
//   });

const router = Router();

const routes = () => {
    // router.post("/upload",upload.single('file'),(req:Request,res:Response)=>{
    //     console.log("body here",req.body,req.file.filename)
    //     const imageURL = `http://localhost:${env.PORT}/uploaded/${req.file.filename}`;
    //     console.log(imageURL)
    //     res.status(201).json(imageURL)
    // })
    router.post("/posts",verifyJwt,upload.single('file'),PostController.uploadPost)
    router.get("/posts/user/:id",verifyJwt,PostController.getPost)
    // router.post("/posts/:id/comments",verifyJwt,PostController.getComments)
    return router;
}

export default routes;