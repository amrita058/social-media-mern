import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../libs';
import multer from 'multer';

export const errorHandler = (err:Error,req:Request,res:Response,next:NextFunction)=>{
    if (err instanceof CustomError){
        res.status(err.status?err.status:500).json(err)
    }
    else if (err instanceof multer.MulterError) {
        // Handle Multer-specific errors
        console.error('Multer error:', err.message);
        res.status(400).json({ error: 'Multer error: ' + err.message });
      } 
    else{
        console.log("error here",err)
        res.status(500).json("Server errors")
    }
}