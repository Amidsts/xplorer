import {
    Request,
    Response,
    NextFunction
} from "express"
import { JwtPayload, decode} from "jsonwebtoken";

import { catchError } from "../helpers/custom_error";
import user from "../models/authModel";
import helper from "../helpers/general";
import { getPostRepository } from "../models/repository/postRepo"
import { getUserRepository } from "../models/repository/authRepo";



const {verifyToken} = helper

export function authUser(roles: Array<string>) {
  return async (
        req: Request, 
        res: Response, 
        next: NextFunction
    ) => {
        try {
    
            const {authorisation} = req.headers

            if (!authorisation) {
                throw new catchError("authourisation token is required")
            }
            
            verifyToken(authorisation.toString())
        
            const decodeToken = decode((authorisation as string).split(" ")[1]) as JwtPayload

            const {id} = decodeToken

            const User = await user.findById(id)
    
            if (!User) throw new catchError("This account is not found")
            
            res.locals.user = User
            
            if ( !roles.includes( res.locals.user.role as string)) throw new catchError("you are not authourized")
            
            return next()
        } catch (error) {
           res.send(error)
        }

    }
}

//allow people the logged in user is following to access the endpoint
export async function authConnections () {
    return async (req: Request, res: Response, next: NextFunction) => {

        const post = await getPostRepository(req.params.postId)
        
        if ( post === null ) {throw new catchError("post not found")} 

        res.locals.post = post

        const postedBy = post.postedBy
        const postOwner = await getUserRepository({_id: postedBy})
console.log(postOwner);

        const {user} = res.locals

        if (post.postedBy !== user._id || !user.followers.includes(postOwner) || !user.followings.includes(postOwner)) { throw new catchError("you are not authourised!") }

        next()
    }
}

//get my followers posts
//