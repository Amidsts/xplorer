import { Router } from "express";
import {
    createPostController, getPostController 
} from "../controllers/postController";

const router = Router()

router.post("/create_post", createPostController)
router.get("/get_post", getPostController)

export default router