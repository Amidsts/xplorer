import {
    createUserRepository, 
    getUserRepository
} from "../models/repository/authRepo";
import helpers from "../helpers/general"
import {
    catchError
} from "../helpers/custom_error";
import { 
    createUserValidator, 
    signInUserValidator 
} from "../inputValidators.ts/auth.validator";


const {
    asyncWrapper,
    responseHandler,
    generateToken,
    hashPassword,
    comparePassword
} = helpers

export async function createUserService (payload: {[key: string]: any}):Promise<any> {
   return await asyncWrapper( async () => {

        const {
            userName,
            password,
            email
        } = createUserValidator(payload)

        const userExists = await getUserRepository({email})

        if (userExists) {
            throw new catchError("This account already exists")
        }
        const hashedPassword = hashPassword(password)

        const newuser = await createUserRepository({
            userName,
            password: hashedPassword,
            email,
            role: "Blogger"
        })

        if ( newuser instanceof Error) { 

            throw new catchError(newuser.message)
        }
        return responseHandler("data saved successfully" ,newuser)
   })
}

export async function logInUserService (payload: {[key: string]: any}):Promise<any> {
    return await asyncWrapper( async () => {
 
        const {
            password,
            email
        } = signInUserValidator(payload)

        const getUser = await getUserRepository({email})

        if ( getUser instanceof Error) { 

            throw new catchError(getUser.message)
        }

        const isPasswrdSame = comparePassword(password, getUser.password)

        if (!isPasswrdSame) {
            throw new catchError("incorrect credentials")
        }

        const token = generateToken({
            id: getUser._id,
            role: getUser.role
        })

        return responseHandler("data saved successfully" ,{
            auth_token: token,
            user: getUser
        })
    })
}