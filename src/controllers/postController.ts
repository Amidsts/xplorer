import { NextFunction, Request, Response } from "express";

import {
    createPostService, 
    getPostService,
    getPostsService
} from "../services/postService"



export async function createPostController(req: Request, res: Response, next: NextFunction) {

    const {user} = res.locals
    const response = await createPostService(req.body, user._id)

    return res.status(response.statusCode).json(response)
}

export async function getPostController(req: Request, res: Response, next: NextFunction) {

    const {user, post} = res.locals
    const response = await getPostService(user._id, post._id)

    return res.status(response.statusCode).json(response)
}

// export async function getPostsController(req: Request, res: Response, next: NextFunction) {

//     const {offset, limit} = res.locals
//     console.log({offset, limit});
    
//     const response = await getPostsService(offset, limit)

//     return res.status(response.statusCode).json(response)
// }