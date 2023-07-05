class BaseError extends Error {
    protected success! :boolean
    public message!: string
    public statusCode!: number  
    protected data!: object 
}

export class catchError extends BaseError {
    constructor ( errMessage: string, statuscode?: number) {
        super()

        this.success = false,
        this.message = errMessage,
        this.statusCode = statuscode as number,
        this.data = {}
    }
}

// export class serverError extends BaseError {
//     constructor ( errMessage: string, statuscode: number) {
//         super()
        
//         this.success = false,
//         this.errorName = "server error",
//         this.message = errMessage,
//         this.statusCode = statuscode,
//         this.data = {}
//     }
// }