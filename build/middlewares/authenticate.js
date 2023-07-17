"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authConnections = exports.authUser = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const custom_error_1 = require("../helpers/custom_error");
const authModel_1 = __importDefault(require("../models/authModel"));
const general_1 = require("../helpers/general");
const postRepo_1 = require("../models/repository/postRepo");
const authRepo_1 = require("../models/repository/authRepo");
function authUser(roles) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { authorisation } = req.headers;
            if (!authorisation) {
                throw new custom_error_1.catchError("authourisation token is required");
            }
            (0, general_1.verifyToken)(authorisation.toString());
            const decodeToken = (0, jsonwebtoken_1.decode)(authorisation.split(" ")[1]);
            const { id } = decodeToken;
            const User = yield authModel_1.default.findById(id);
            if (User instanceof Error) {
                throw new custom_error_1.catchError(User.message);
            }
            User.password = "";
            res.locals.user = User;
            if (!roles.includes(res.locals.user.role))
                throw new custom_error_1.catchError("you are not authourized");
            return next();
        }
        catch (error) {
            res.send(new custom_error_1.catchError(error.message));
        }
    });
}
exports.authUser = authUser;
//allow people the logged in user is following to access the endpoint
function authConnections() {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const post = yield (0, postRepo_1.getPostRepository)(req.params.postId);
        if (post === null) {
            throw new custom_error_1.catchError("post not found");
        }
        res.locals.post = post;
        const postedBy = post.postedBy;
        const postOwner = yield (0, authRepo_1.getUserRepository)({ _id: postedBy });
        console.log(postOwner);
        const { user } = res.locals;
        if (post.postedBy !== user._id || !user.followers.includes(postOwner) || !user.followings.includes(postOwner)) {
            throw new custom_error_1.catchError("you are not authourised!");
        }
        next();
    });
}
exports.authConnections = authConnections;
//get my followers posts
//
