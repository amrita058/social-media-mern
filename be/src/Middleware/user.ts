import { Request, Response, NextFunction } from 'express'
import jwt from "jsonwebtoken"
import { env } from '../config'
import { CustomError } from '../libs';

declare module 'express' {
  export interface Request {
    user?: any;
  }
}

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const fe_token = req.headers.authorization
  const token = authHeader?authHeader:null
  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token missing.' });
  }
  jwt.verify(token,env.SECRET_KEY as string,(err: any, decoded:any)=>{
    // console.log("error",err)
    if (err) return res.status(401).json("Invalid token")
    req.user = decoded
    // console.log("user here",req.user)
    next()
  })
};