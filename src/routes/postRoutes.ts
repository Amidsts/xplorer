import { Router } from "express";
import {
    createPostController, 
    getPostController,
    getPostsController
} from "../controllers/postController";
import { paginate } from "../middlewares/paginate";
import { authUser } from "../middlewares/authenticate";

const router = Router()

router.post("/create_post", authUser(["Blogger"]), createPostController)
router.get("/get_post/:postId", authUser(["Blogger"]), getPostController)
router.get("/get_posts", authUser(["Blogger"]), paginate(), getPostsController)





export default router