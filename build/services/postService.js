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
exports.reactToPostService = exports.getPostsService = exports.getPostService = exports.createPostService = void 0;
const postRepo_1 = require("../models/repository/postRepo");
const general_1 = require("../helpers/general");
const custom_error_1 = require("../helpers/custom_error");
const authRepo_1 = require("../models/repository/authRepo");
const post_validator_1 = require("../inputValidators.ts/post.validator");
const postModel_1 = __importDefault(require("../models/postModel"));
function createPostService(userId, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, general_1.asyncWrapper)(() => __awaiter(this, void 0, void 0, function* () {
            const { title, subtitle, body, category } = (0, post_validator_1.createPostValidator)(payload);
            const newPost = yield (0, postRepo_1.createPostRepository)({
                title,
                subtitle,
                body,
                category,
                postedBy: userId
            });
            if (newPost instanceof Error) {
                throw new custom_error_1.catchError(newPost.message);
            }
            yield (0, authRepo_1.updateUserDataRepository)(newPost.postedBy, {
                "$push": {
                    posts: newPost._id
                }
            });
            return (0, general_1.responseHandler)("post has been created successfully", newPost);
        }));
    });
}
exports.createPostService = createPostService;
//only post owner and post owner follwers can access
function getPostService(post) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, general_1.asyncWrapper)(() => __awaiter(this, void 0, void 0, function* () {
            return (0, general_1.responseHandler)("post has been retrieved", post);
        }));
    });
}
exports.getPostService = getPostService;
function getPostsService(userId, skip, nPerPage) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, general_1.asyncWrapper)(() => __awaiter(this, void 0, void 0, function* () {
            let postOwnersId = [];
            const user = yield (0, authRepo_1.getUserRepository)({ _id: userId });
            const followersId = user.followers;
            const followingsId = user.followings;
            postOwnersId.push(userId, ...followersId, ...followingsId);
            const posts = yield (0, postRepo_1.getPostsRepository)(postOwnersId, skip, nPerPage);
            if (!posts.length) {
                throw new custom_error_1.catchError("There is no post");
            }
            return (0, general_1.responseHandler)("post has been retrieved", posts);
        }));
    });
}
exports.getPostsService = getPostsService;
//not completed
function reactToPostService(Post, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (Post.likes.includes(userId)) {
                yield postModel_1.default.updateOne({ _id: Post._id }, { $pull: { likes: userId } });
                return (0, general_1.responseHandler)(`you just unlike ${Post.title}`);
            }
            else {
                yield postModel_1.default.updateOne({ _id: Post._id }, { $push: { likes: userId } });
                return (0, general_1.responseHandler)(`you just liked ${Post.title}`);
            }
        }
        catch (error) {
            return new custom_error_1.catchError(error.message);
        }
    });
}
exports.reactToPostService = reactToPostService;
//delete a post
//edit/update a post
