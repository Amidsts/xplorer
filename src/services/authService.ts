import mongoose from "mongoose";


import {
    createUserRepository, 
    getUserRepository,
    updateUserDataRepository
} from "../models/repository/authRepo";
import {
    asyncWrapper,
    responseHandler,
    generateToken,
    hashPassword,
    comparePassword
} from "../helpers/general"
import {
    catchError
} from "../helpers/custom_error";
import { 
    createUserValidator, 
    signInUserValidator 
} from "../inputValidators.ts/auth.validator";
import user from "../models/authModel";



export async function createUserService (payload: {[key: string]: any}):Promise<any> {
   return await asyncWrapper( async () => {

        const {
            userName,
            password,
            email
        } = createUserValidator(payload)
console.log(password);

        const userExists = await getUserRepository({email})

        if (userExists) {
            throw new catchError("This account already exists")
        }
        const hash = hashPassword(password)

        const newuser = await createUserRepository({
            userName,
            password: hash,
            email,
            role: "Blogger"
        })

        newuser.password = ""

        if ( newuser instanceof Error) { 

            throw new catchError(newuser.message)
        }

        return responseHandler("data saved successfully",newuser)
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
            throw new catchError("invalid credentials")
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

//implement transaction
export async function followUserService( followerId: string, followingId: string ): Promise<any> {
console.log(followerId.toString());

    const session = await mongoose.startSession()

    try {
        //check if following exists
        const userExist = await getUserRepository({_id: followingId})

        if (userExist instanceof Error ){ throw new catchError(userExist.message)}

        //update the folower data (i.e user with the followerId)
        const followUser = await user.findOneAndUpdate(
            {_id: followerId.toString()},
            {"$push" : {
                followings: userExist._id
            }},
            {session}
        )

        //update the followee data (i.e user with the followingId)
        const c= await user.findOneAndUpdate(
            {_id: userExist._id},
            {"$push" : {
                followers: followerId
            }},
            {session}
        )

        return responseHandler(`you are now following ${userExist.userName}`)
    } catch (error: any) {

        await session.abortTransaction()
        return new catchError(error.message, 500)

    } finally {
        session.endSession()
    }

}

export async function unFollowUserService( followerId: string, followingId: string ): Promise<any> {

    const  session = await mongoose.startSession()
    try {
        const followingExists = await getUserRepository({_id: followingId})

        if (followingExists instanceof Error ){ throw new catchError(followingExists.message)}

        const unFollowUser = await user.findByIdAndUpdate(
            {_id: followerId},
            {"$pull" : {
                followings: followingExists._id
            }},
            {session}
        )
        const unFollowedUser = await user.findByIdAndUpdate(
            {_id: followingId},
            {"$pull" : {
                followers: followerId
            }},
            {session}
        )

        return responseHandler(`you unfollow ${unFollowedUser!.userName}`)

    } catch (error: any) {

        await session.abortTransaction()
        return new catchError(error.message, 500)

    } finally {
        session.endSession()
    }

}

//get all followers or followings
export async function getConnectionsServices (userId: string, networkType: string): Promise<any> {
    return asyncWrapper( async () => {
        const user = await getUserRepository({_id: userId})

        if (user instanceof Error) {
            throw new catchError(user.message)
        }

        let network 

        if (networkType === "followers") {
            network = user.followers

            if (!network) { throw new catchError("you dont have any follwers") }
        }else if (networkType === "followings") {
            network = user.followings

            if (!network) { throw new catchError("you dont have any follwings") }
        } else {
            throw new catchError("This network does not exist")
        }

        return responseHandler(`${network} retrieved successfully`, network)
    })
}

//get all users (admin only)
//reset profile details
//change password while online
//reset password
//upload profile picture
