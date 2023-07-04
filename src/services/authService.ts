import {
    createUser
} from "../models/repository/authRepo";
import helpers from "../helpers/general"
import {
    catchError, 
} from "../helpers/custom_error";


const {
    asyncWrapper,
    responseHandler
} = helpers

export async function createUserService (payload: {[key: string]: any}):Promise<any> {
   return await asyncWrapper( async () => {

        const newuser = await createUser(payload)

        if ( newuser instanceof Error) { 

            throw new catchError(newuser.message, 400)
        }

        return responseHandler("data saved successfully" ,newuser)
   })
}