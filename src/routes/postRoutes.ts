import { Router } from "express";
import {
    createPostController, 
    getPostController,
} from "../controllers/postController";
import { paginate } from "../middlewares/paginate";
import { authConnections, authUser } from "../middlewares/authenticate";

const router = Router()

router.post("/post/create_post", authUser(["Blogger"]), createPostController)
router.get("/post/get_post/:postId", authUser(["Blogger"]), authConnections(), getPostController)

router.put("/post/like_unlike")







export default router