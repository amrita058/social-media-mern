import { Router } from "express";
const jwt = require("jsonwebtoken")

import * as UserController from '../Controller'
import {verifyJwt} from "../../Middleware/user"
import { upload } from "../../Middleware/multer";

declare module 'express' {
    export interface Request {
      user?: any;
      file?:any;
    }
  }


const router = Router();

const routes = () => {
    router.post("/login",UserController.loginUser)
    router.post("/register",UserController.registerUser)
    router.post('/forgetpassword',UserController.forgetPassword)
    router.post('/resetpassword',verifyJwt,UserController.resetPassword)
    router.post('/auth',verifyJwt,UserController.authUser)
    router.post('/user/:id',verifyJwt,upload.single('file'),UserController.updateProfile)
    router.post('/friend-request',verifyJwt,UserController.friendRequest)
    router.get('/user/:id/friend-request',verifyJwt,UserController.getFriendRequest)
    router.post('/approve-request',verifyJwt,UserController.approveFriendRequest)
    return router;
}

export default routes;