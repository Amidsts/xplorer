import {Schema, model} from "mongoose"

import { Role } from "../helpers/enum"

export interface IUser {
    userName: string
    password: string
    email: string
    followers?: string[]
    followings?: Array<string>
    pic?: string
    role: Role
    posts?: Array<string>
}


const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    pic: {
        imageId: String,
        imageUrl: String
    },
    followers: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    followings: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    role: {
        type: String,
        enum: Role,
        default: "Blogger"
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "user"
    }]
},
{timestamps: true})

const user = model<IUser>("user", userSchema)


export default user