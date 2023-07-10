import dotenv from "dotenv"
import {verify, sign, SignOptions} from "jsonwebtoken"
import bcrypt, {genSaltSync} from "bcrypt"

import { catchError } from "./custom_error"


dotenv.config()



class ApiResponder {

    async asyncWrapper (callback: () => void, extra?: any) {
        try {
             const result = await callback()

            return result
        } catch (error: any) {
    
            return new catchError(error.message, 500)
        } finally {
            return 
        }
    }       

    responseHandler (Message: string, payload?: any) {
        return {
            success: true,
            message: Message,
            statusCode: 200,
            data: payload || {}
        }
    }

    env (secret: string) {
        const {env} = process

        return env[secret] || ""
    }

    generateToken(payload: {[key: string]: any}) {
        const signOptions:SignOptions ={
            expiresIn: 20000
         }
         return sign(payload, this.env("jwt_secret"), signOptions)
    }

    verifyToken (authToken: string) {

        const token = authToken.split(" ")[1]
        return verify(token, this.env("jwt_secret"), (err, decode) => {
    
            if (err) throw new catchError(`session expired: ${err.message}` ,403)
            return decode
        })
    
    
    }

    validate(schema: {[key: string]: any}, inputData: {[key: string]: any}) {

        const {error, value} = schema.validate(inputData)
        if (error) throw new catchError(`${value} ${error}`)
    
        return value 
    }

    hashPassword(plainPassword: string) {

        return bcrypt.hashSync(plainPassword, genSaltSync(10))
    }

    comparePassword (plainPassword: string, hashPassword: string) {

        return bcrypt.compareSync(plainPassword, hashPassword)
    }
}


export default new ApiResponder()