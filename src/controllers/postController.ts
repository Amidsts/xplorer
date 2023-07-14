import { NextFunction, Request, Response } from "express";

import {
    createPostService, 
    getPostService,
    getPostsService,
    reactToPostService
} from "../services/postService"



export async function createPostController(req: Request, res: Response, next: NextFunction) {

    const {user} = res.locals
    const response = await createPostService(req.body, user._id)

    return res.status(response.statusCode).json(response)
}

export async function getPostController(req: Request, res: Response, next: NextFunction) {

    const {post} = res.locals
    const response = await getPostService(post)

    return res.status(response.statusCode).json(response)
}

export async function getPostsController(req: Request, res: Response, next: NextFunction) {

    const {offset, limit, user} = res.locals
    
    const response = await getPostsService(user._id, offset, limit)

    return res.status(response.statusCode).json(response)
}

export async function reactToPostController(req: Request, res: Response, next: NextFunction) {

    const {post, user} = res.locals
    const response = await reactToPostService(post, user._id)

    return res.status(response.statusCode).json(response)
}