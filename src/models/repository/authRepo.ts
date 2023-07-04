import { SaveOptions } from "mongoose";

import user from "../authModel";
import helpers from "../../helpers/general"
import { catchError } from "../../helpers/custom_error";

const {asyncWrapper} = helpers


//createUser
export async function createUser(payload: {[key: string]: any}) {

    return await asyncWrapper( async() => {
        
        const newUser = await new user(payload).save()
        
        return newUser
    })
}

//get user
export async function getUser(userId: string) {

    return await asyncWrapper( async() => {
        
        const getUser = await user.findById(userId)
        return getUser
    })
}

export async function getUsers(page: number, perPage: number) {

    return await asyncWrapper( async() => {
        
        const getUsers = await user.find()

        return getUser
    })
}

//update profile picture
export async function uploadPics () {
    
} 


//getUsers

//getuser

//getfollowers

//getFollowing

//follow user

//unfollow user

//

