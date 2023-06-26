import { NextFunction, Request, Response } from "express";

import { createUserService } from "../services/userService";
import helpers from "../helpers/general";

export async function createUserController(req: Request, res: Response, next: NextFunction) {
    try {
        const response = await createUserService(req.body)

        return res.json(response)

    } catch (error) {
        
        res.send(error)
    }
}