import { NextFunction, Request, Response } from "express";

import { createUserService } from "../services/authService";
import helpers from "../helpers/general";

export async function createUserController(req: Request, res: Response, next: NextFunction) {

    const response = await createUserService(req.body)

    return res.status(response.statusCode).json(response)

    // try {

    //     const response = await createUserService(req.body)
    //     console.log("check1");
    //     return res.status(response.statusCode).json(response)

    // } catch (error: any) {
    //     console.log("check2");
        
    //     res.send(error)
    // }
}