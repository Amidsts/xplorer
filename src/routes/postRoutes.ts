import { Router } from "express";
import {
    createPostController, 
    getPostController,
    getPostsController,
    reactToPostController
} from "../controllers/postController";
import { paginate } from "../middlewares/paginate";
import { authConnections, authUser } from "../middlewares/authenticate";

const router = Router()

router.post("/post/create_post", authUser(["Blogger"]), createPostController)
router.get("/post/get_post/:postId", authUser(["Blogger"]), authConnections(), getPostController)
router.get("/post/get_posts", authUser(["Blogger"]), paginate(), getPostsController)

router.put("/post/reaction", authUser(["Blogger"]), authConnections(), reactToPostController)


export default router