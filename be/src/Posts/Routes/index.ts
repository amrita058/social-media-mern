import { Router } from "express";
const jwt = require("jsonwebtoken")

import * as PostController from '../Controller'
import { verifyJwt } from "../../Middleware/user";
import { upload } from "../../Middleware/multer";

const router = Router();

const routes = () => {
    router.post("/posts",verifyJwt,upload.single('file'),PostController.uploadPost)
    router.get("/posts/user/:id",verifyJwt,PostController.getPost)
    router.delete("/posts/:id",verifyJwt,PostController.deletePosts)
    router.post("/posts/:id/comments",verifyJwt,PostController.postComments)
    router.get("/posts/:id/comments",verifyJwt,PostController.getComments)
    router.delete("/posts/:id/comments",verifyJwt,PostController.deleteComments)
    router.post("/posts/:id/like",verifyJwt,PostController.likePost)
    return router;
}

export default routes;