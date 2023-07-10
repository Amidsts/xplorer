import { Router } from "express";

import { 
    createUserController,
    logInUserController,
    followUserController,
    unfollowUserController,
    getFollowersController,
    getFollowingsController
} from "../controllers/authController";

const router = Router()

router.post("/user/sign_up", createUserController);
router.post("/user/sign_in", logInUserController)


router.put("/user/follow", followUserController)
router.put("/user/unfollow", unfollowUserController)
router.get("/user/followers", getFollowersController)
router.get("/user/followings", getFollowingsController)


export default router