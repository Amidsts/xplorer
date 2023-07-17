"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchError = void 0;
class BaseError extends Error {
}
class catchError extends BaseError {
    constructor(errMessage, statuscode) {
        super();
        this.success = false,
            this.message = errMessage,
            this.statusCode = statuscode,
            this.data = {};
    }
}
exports.catchError = catchError;
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
