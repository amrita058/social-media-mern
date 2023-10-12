import { Router } from "express";
const jwt = require("jsonwebtoken")

import * as UserController from '../Controller'
import {verifyJwt} from "../Middleware/user"

const router = Router();

const routes = () => {
    router.post("/login",UserController.loginUser)
    router.post("/register",UserController.registerUser)
    router.post('/forgetpassword',UserController.forgetPassword)
    router.post('/resetpassword',verifyJwt,UserController.resetPassword)
    router.post('/auth',verifyJwt,UserController.authUser)
    router.post('/user/:id',verifyJwt,UserController.updateProfile)
    return router;
}

export default routes;