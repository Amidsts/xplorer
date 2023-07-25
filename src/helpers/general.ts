import dotenv from "dotenv"
import {verify, sign, SignOptions} from "jsonwebtoken"
import bcrypt, {genSaltSync} from "bcrypt"

import { catchError } from "./custom_error"


dotenv.config()

export async function asyncWrapper (callback: () => void, extra?: any) {
    try {
        const result = await callback()

        return result
    } catch (error: any) {

        return new catchError(error.message)
    }
}

export function responseHandler (Message: string, payload?: any) {
    return {
        success: true,
        message: Message,
        statusCode: 200,
        data: payload || {}
    }
}

export function env (secret: string) {
    const {env} = process
    return env[secret] || ""
}
export function generateToken (payload: {[key: string]: any}) {

    const signOptions:SignOptions ={
        expiresIn: 20000
    }
    
    return sign(payload, env("jwt_secret"), signOptions)
}
export function verifyToken (authToken: string) {

    const token = authToken.split(" ")[1]
    return verify(token, env("jwt_secret"), (err, decode) => {
 
        if (err) throw new catchError(`session expired: ${err.message}` ,403)
        return decode
    })
}
export function validate(schema: {[key: string]: any}, inputData: {[key: string]: any}) {

    const {error, value} = schema.validate(inputData)
    if (error) throw new catchError(`${value} ${error}`)

    return value 
}
export function hashPassword(plainPassword: string) {

    return bcrypt.hashSync(plainPassword, genSaltSync(10))
}
export function comparePassword (plainPassword: string, hashPassword: string) {

    return bcrypt.compareSync(plainPassword, hashPassword)
}
