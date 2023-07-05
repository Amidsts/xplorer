import { NextFunction, Request, Response } from "express";

import {
    createPostService, 
    getPostService,
    getPostsService
} from "../services/postService"



export async function createPostController(req: Request, res: Response, next: NextFunction) {

    const response = await createPostService(req.body)

    return res.status(response.statusCode).json(response)
}

export async function getPostController(req: Request, res: Response, next: NextFunction) {

    const response = await getPostService(req.params.postId)

    return res.status(response.statusCode).json(response)
}

export async function getPostsController(req: Request, res: Response, next: NextFunction) {

    const {offset, limit} = res.locals
    console.log({offset, limit});
    
    const response = await getPostsService(offset, limit)

    return res.status(response.statusCode).json(response)
}