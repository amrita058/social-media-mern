const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req: Request, file: any, cb:any) => {
      cb(null, './src/uploads');
    },
    filename: (req: Request, file:any, cb:any) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
export  const upload = multer({
      storage: storage,
      limits: { fileSize: 1024 * 1024 }
})

