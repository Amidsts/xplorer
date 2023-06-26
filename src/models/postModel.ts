import {Schema, model} from "mongoose"

import { postcategory } from "../Enums/postsEnum"

interface IPost {
    title: string
    subtitle: string
    body: string
    likes?: Array<string>
    category: postcategory,
    photo?: {
        imageUrl: string
        imageId: string
    }
    comments?: Array<string>
    postedBy: string
}

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: String,
    body: {
        type: String,
        required: true
    },
    likes: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    category: {
        type: String,
        required: true,
        enum: postcategory
    },
    photo: {
        imageUrl: String,
        imageId: String
    },
    comments: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    postedBy:{
        type: Schema.Types.ObjectId,
        ref: "user",
        require: true
    }
},
{timestamps: true})

const post = model<IPost>("", postSchema)


export default post

