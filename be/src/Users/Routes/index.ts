import { Router } from "express";
const jwt = require("jsonwebtoken")
// const multer = require('multer');

import * as UserController from '../Controller'
import {verifyJwt} from "../../Middleware/user"
import { upload } from "../../Middleware/multer";

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
    router.post("/login",UserController.loginUser)
    router.post("/register",UserController.registerUser)
    router.post('/forgetpassword',UserController.forgetPassword)
    router.post('/resetpassword',verifyJwt,UserController.resetPassword)
    router.post('/auth',verifyJwt,UserController.authUser)
    router.post('/user/:id',verifyJwt,upload.single('file'),UserController.updateProfile)
    return router;
}

export default routes;