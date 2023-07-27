import { NextFunction, Request, Response } from "express";

import { 
    createUserService ,
    logInUserService,
    getConnectionsServices,
    connectUsersService
} from "../services/authService";



export async function createUserController(req: Request, res: Response, next: NextFunction) {

    const response = await createUserService(req.body)
console.log(response);

    return res.status(response.statusCode).json(response)
}

export async function logInUserController(req: Request, res: Response, next: NextFunction) {

    const response = await logInUserService(req.body)

    return res.status(response.statusCode).json(response)
}

export async function connectUsersController(req: Request, res: Response, next: NextFunction) {

    const {user} = res.locals
    
    const response = await connectUsersService(user._id, req.body.userId)

    return res.status(response.statusCode).json(response)
}

export async function getFollowersController(req: Request, res: Response, next: NextFunction) {

    const {user} = res.locals
    
    const response = await getConnectionsServices(user, "followers")

    return res.status(response.statusCode).json(response)
}

export async function getFollowingsController(req: Request, res: Response, next: NextFunction) {

    const {user} = res.locals
    const response = await getConnectionsServices(user, "followings")

    return res.status(response.statusCode).json(response)
}