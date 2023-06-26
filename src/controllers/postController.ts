import { NextFunction, Request, Response } from "express";

import {
    createPostService, 
    getPostService
} from "../services/postService"
import helpers from "../helpers/general";

export async function createPostController(req: Request, res: Response, next: NextFunction) {
    try {
        const response = await createPostService(req.body)

        return res.json(response)

    } catch (error) {
        
        res.send(error)
    }
}

export async function getPostController(req: Request, res: Response, next: NextFunction) {
    try {
        const response = await getPostService(req.params.postId)

        return res.json(response)

    } catch (error) {
        
        res.send(error)
    }
}