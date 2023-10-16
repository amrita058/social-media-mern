// import { Request, Response } from 'express';
// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: (req: Request, file: any, cb:any) => {
//     cb(null, '../static/images');
//   },
//   filename: (req: Request, file:any, cb:any) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const upload = multer({ storage });

export const uploadPost =(file:any)=>{
  try{
    console.log("reached here")
    return "true"

  }catch(e){
    console.log("error in file upload",e)
  }
}
