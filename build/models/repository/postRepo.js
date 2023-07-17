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
exports.updatePostRepository = exports.getPostRepository = exports.getPostsRepository = exports.createPostRepository = void 0;
const postModel_1 = __importDefault(require("../postModel"));
const general_1 = require("../../helpers/general");
//create post
function createPostRepository(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, general_1.asyncWrapper)(() => __awaiter(this, void 0, void 0, function* () {
            const newPost = yield new postModel_1.default(payload).save();
            return newPost;
        }));
    });
}
exports.createPostRepository = createPostRepository;
//get all posts (only admin and network)
function getPostsRepository(payload, offset, nPerPage) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, general_1.asyncWrapper)(() => __awaiter(this, void 0, void 0, function* () {
            const totalPosts = yield postModel_1.default.count();
            if (offset >= totalPosts) {
                offset = totalPosts / 2;
            }
            const posts = yield postModel_1.default.find({
                postedBy: {
                    $in: payload
                }
            })
                .skip(offset)
                .limit(nPerPage)
                .sort("asc");
            return posts;
        }));
    });
}
exports.getPostsRepository = getPostsRepository;
// get my post
function getPostRepository(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, general_1.asyncWrapper)(() => __awaiter(this, void 0, void 0, function* () {
            const postExist = yield postModel_1.default.findById(postId).populate("postedBy");
            return postExist;
        }));
    });
}
exports.getPostRepository = getPostRepository;
//delete post
//update post
function updatePostRepository(postId, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, general_1.asyncWrapper)(() => __awaiter(this, void 0, void 0, function* () {
            const postExist = yield postModel_1.default.findByIdAndUpdate(postId, payload);
            return postExist;
        }));
    });
}
exports.updatePostRepository = updatePostRepository;
//unlike post
//comment on a post
//search posts by category 
//get post
