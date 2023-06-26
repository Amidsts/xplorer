import {
    createUser
} from "../models/repository/userRepo";
import helpers from "../helpers/general"
import {
    clientError, 
    serverError
} from "../helpers/custom_error";
import user from "../models/userModel";



const {
    asyncWrapper,
    responseHandler
} = helpers

export async function createUserService (payload: {[key: string]: any}) {
   return await asyncWrapper( async () => {

        const newuser = await createUser(payload)

        if ( newuser instanceof Error) { 

            throw new clientError(newuser.message, 400)
        }
        return responseHandler("data saved successfully" ,newuser)
   })
}