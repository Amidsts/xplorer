import { NextFunction, Request, Response } from "express";

import { 
    createUserService ,
    logInUserService,
    followUserService,
    unFollowUserService,
    getConnectionsServices
} from "../services/authService";



export async function createUserController(req: Request, res: Response, next: NextFunction) {

    const response = await createUserService(req.body)

    return res.status(response.statusCode).json(response)
}

export async function logInUserController(req: Request, res: Response, next: NextFunction) {

    const response = await logInUserService(req.body)

    return res.status(response.statusCode).json(response)
}

export async function followUserController(req: Request, res: Response, next: NextFunction) {

    const {user} = res.locals
    const response = await followUserService(user._id, req.body.userId)

    return res.status(response.statusCode).json(response)
}

export async function unfollowUserController(req: Request, res: Response, next: NextFunction) {

    const {user} = res.locals
    const response = await unFollowUserService(user._id, req.body.userId)

    return res.status(response.statusCode).json(response)
}

export async function getFollowersController(req: Request, res: Response, next: NextFunction) {

    const {user} = res.locals
    const response = await getConnectionsServices(user._id, "followers")

    return res.status(response.statusCode).json(response)
}

export async function getFollowingsController(req: Request, res: Response, next: NextFunction) {

    const {user} = res.locals
    const response = await getConnectionsServices(user._id, "followings")

    return res.status(response.statusCode).json(response)
}