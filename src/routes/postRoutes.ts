import { Router } from "express";
import {
    createPostController, getPostController 
} from "../controllers/postController";

const router = Router()

router.post("/createPost", createPostController)
router.get("/getPost", getPostController)

export default router