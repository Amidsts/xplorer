import dotenv from "dotenv"
import { catchError } from "./custom_error"

dotenv.config()

class ApiResponder {

    async asyncWrapper (callback: () => void) {
        try {
            const c = await callback()
          
            return c
        } catch (error: any) {
            // console.log("err message", error.message);
            return new catchError(error.message, 500)
            // return error
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

    showData (message: string, data?: {[key: string]: any}) {
        return this.responseHandler(message, data)
    }

    env (secret: string) {
        const {env} = process

        return env[secret] || ""
    }
}

// export const asyncwrapper = async (callback: () => string) => {
//     try {

//         return callback()
//     } catch (error) {
//         return error
//     }
// }

export default new ApiResponder()