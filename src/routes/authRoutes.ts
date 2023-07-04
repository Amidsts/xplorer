import { Router } from "express";

import { createUserController } from "../controllers/authController";

const router = Router()

router.post("/signUp", createUserController);


export default router