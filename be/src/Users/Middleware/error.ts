import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../../libs';

export const errorHandler = (err:Error,req:Request,res:Response,next:NextFunction)=>{
    if (err instanceof CustomError){
        res.status(err.status?err.status:500).json(err)
    }
    else{
        res.status(500).json("Server error")
    }
}