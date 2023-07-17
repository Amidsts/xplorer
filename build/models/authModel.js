"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const enum_1 = require("../helpers/enum");
const userSchema = new mongoose_1.Schema({
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
    followers: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "user"
        }],
    followings: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "user"
        }],
    role: {
        type: String,
        enum: enum_1.Role,
        default: "Blogger"
    },
    posts: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "user"
        }]
}, { timestamps: true });
const user = (0, mongoose_1.model)("user", userSchema);
exports.default = user;
