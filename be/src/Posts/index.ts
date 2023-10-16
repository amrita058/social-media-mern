import { Router } from "express";
const jwt = require("jsonwebtoken")
import express from "express"

import * as UserController from './Controller'
import { Request, Response } from 'express';
import { env } from "process";
const multer = require('multer');

declare module 'express' {
    export interface Request {
      user?: any;
      file?:any;
    }
  }

const storage = multer.diskStorage({
  destination: (req: Request, file: any, cb:any) => {
    cb(null, './src/Posts/uploads');
  },
  filename: (req: Request, file:any, cb:any) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 }
  });
const router = Router();

const routes = () => {
    router.post("/upload",upload.single('file'),(req:Request,res:Response)=>{
        console.log("body here",req.body,req.file.filename)
        const imageURL = `http://localhost:${env.PORT}/uploaded/${req.file.filename}`;
        console.log(imageURL)
        res.status(201).json(imageURL)
    })
    return router;
}

export default routes;