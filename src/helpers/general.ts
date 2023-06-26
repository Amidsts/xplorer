import dotenv from "dotenv"

dotenv.config()

class ApiResponder {

    async asyncWrapper (callback: () => void) {
        try {

            return callback()
        } catch (error) {
            return error
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