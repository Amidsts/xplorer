import user from "../userModel";
import helpers from "../../helpers/general"

const {asyncWrapper} = helpers


//createUser
export async function createUser(payload: {[key: string]: any}) {

    return await asyncWrapper( async() => {
        const newUser = await new user(payload).save()
        return newUser
    })
}

//update profile picture
export async function updatePics () {

} 

//getUsers

//getuser

//getfollowers

//getFollowing

//follow user

//unfollow user

//

