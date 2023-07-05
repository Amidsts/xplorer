import { SaveOptions } from "mongoose";

import user from "../authModel";
import helpers from "../../helpers/general"
import { catchError } from "../../helpers/custom_error";

const {asyncWrapper} = helpers


//createUser
export async function createUserRepository(payload: {[key: string]: any}): Promise<any> {

    return await asyncWrapper( async() => {
        
        const newUser = await new user(payload).save()
        
        return newUser
    })
}

//get user
export async function getUserRepository(payload: {[key: string]: any}): Promise<any> {

    return await asyncWrapper( async() => {
        
        const getUser = await user.findOne(payload)
        return getUser
    })
}

export async function getUsersRepository(page: number, perPage: number): Promise<any> {

    return await asyncWrapper( async() => {
        
        const getUsers = await user.find()

        return getUsers
    })
}

export async function updateUserDataRepository(userId: string, payload: {[key:string]: any}): Promise<any> {

    return await asyncWrapper( async() => {
        
        const updateUserData = await user.findByIdAndUpdate(userId, payload)

        return updateUserData
    })
}

//update profile picture
export async function uploadPicsRepository (): Promise<any> {

} 


//getUsers

//getuser

//getfollowers

//getFollowing

//follow user

//unfollow user

//

