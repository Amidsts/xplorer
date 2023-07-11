import { Router } from "express";

import { 
    createUserController,
    logInUserController,
    connectUsersController,
    getFollowersController,
    getFollowingsController
} from "../controllers/authController";
import { authConnections, authUser } from "../middlewares/authenticate";

const router = Router()

router.post("/user/sign_up", createUserController);
router.post("/user/sign_in", logInUserController)


router.put("/user/connect", authUser(["Blogger"]), connectUsersController)
router.get("/user/followers", authUser(["Blogger"]), getFollowersController)
router.get("/user/followings", authUser(["Blogger"]), getFollowingsController)


export default router