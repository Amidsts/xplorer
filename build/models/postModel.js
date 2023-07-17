"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const enum_1 = require("../helpers/enum");
const postSchema = new mongoose_1.Schema({
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
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "user"
        }],
    category: {
        type: String,
        required: true,
        enum: enum_1.postcategory
    },
    photo: {
        imageUrl: String,
        imageId: String
    },
    comments: [{
            commentators: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "user"
            },
            comment: {
                type: String,
                required: true
            }
        }],
    postedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
        require: true
    }
}, { timestamps: true });
const post = (0, mongoose_1.model)("post", postSchema);
exports.default = post;
