import {
    Request,
    Response,
    NextFunction
} from "express"
import { JwtPayload, decode} from "jsonwebtoken";

import { catchError } from "../helpers/custom_error";
import user from "../models/authModel";
import {IRequest} from "../helpers/enum"
import helper from "../helpers/general";



const {verifyToken} = helper

export function authUser(roles: Array<string>) {
  return async (
        req: IRequest, 
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