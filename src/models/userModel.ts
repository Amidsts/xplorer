import {Schema, model} from "mongoose"

import { Role } from "../Enums/userEnum"

interface IUser {
    userName: string
    password: string
    email: string
    followers?: string[]
    following?: Array<string>
    pic: string
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
    following: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    role: {
        type: String,
        required: true,
        enum: Role
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "user"
    }]
},
{timestamps: true})

const user = model<IUser>("user", userSchema)


export default user