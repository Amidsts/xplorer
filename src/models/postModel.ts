import {Schema, model} from "mongoose"

import { postcategory } from "../helpers/enum"

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
    comments?: {
        commentator: string,
        comment: string
    }[]
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
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "user"
    }],
    category: {
        type: String,
        required: true,
        enum: postcategory
    },
    photo: {
        imageUrl: String,
        imageId: String
    },
    comments: [{
        commentators: {
            type: Schema.Types.ObjectId,
            ref: "user"
        },
        comment: {
            type: String,
            required: true
        }
    }],
    postedBy:{
        type: Schema.Types.ObjectId,
        ref: "user",
        require: true
    }
},
{timestamps: true})

const post = model<IPost>("post", postSchema)


export default post

