import { SaveOptions } from "mongoose";

import user from "../authModel";
import {asyncWrapper} from "../../helpers/general"
import { catchError } from "../../helpers/custom_error";


//createUser
export async function createUserRepository(payload: {[key: string]: any}): Promise<any> {

    return await asyncWrapper( async() => {
        
        const newUser = await new user(payload).save()
        
        return newUser
    })
}

//get user
export async function getUserRepository(payload: {[key: string]: any}, excludeField?: boolean): Promise<any> {

    return await asyncWrapper( async() => {

        if (excludeField){
            const getUser = await user.findOne(payload).select("-password")
            return getUser
        }

        const getUser = await user.findOne(payload)
        return getUser
    })
}

export async function getUsersRepository(page: number, perPage: number): Promise<any> {

    return await asyncWrapper( async() => {
        
        const getUsers = await user.find().select("-password")

        return getUsers
    })
}

export async function updateUserDataRepository(filter: {[key: string]: any}, payload: {[key:string]: any}): Promise<any> {

    return await asyncWrapper( async() => {

        const updateUserData = await user.findOneAndUpdate(filter, payload)

        return updateUserData
    })
}

//update profile picture
export async function uploadPicsRepository (): Promise<any> {

} 

//follow user
// export async function followUserDataRepository(userId: string, payload: {[key:string]: any}): Promise<any> {

//     return await asyncWrapper( async() => {
        
//         const updateUserData = await user.findByIdAndUpdate(userId, payload)

//         return updateUserData
//     })
// }


//unfollow user

//getUsers

//getuser

//getfollowers

//getFollowing



//

