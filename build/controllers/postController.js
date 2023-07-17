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
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactToPostController = exports.getPostsController = exports.getPostController = exports.createPostController = void 0;
const postService_1 = require("../services/postService");
function createPostController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user } = res.locals;
        const response = yield (0, postService_1.createPostService)(req.body, user._id);
        return res.status(response.statusCode).json(response);
    });
}
exports.createPostController = createPostController;
function getPostController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { post } = res.locals;
        const response = yield (0, postService_1.getPostService)(post);
        return res.status(response.statusCode).json(response);
    });
}
exports.getPostController = getPostController;
function getPostsController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { offset, limit, user } = res.locals;
        const response = yield (0, postService_1.getPostsService)(user._id, offset, limit);
        return res.status(response.statusCode).json(response);
    });
}
exports.getPostsController = getPostsController;
function reactToPostController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { post, user } = res.locals;
        const response = yield (0, postService_1.reactToPostService)(post, user._id);
        return res.status(response.statusCode).json(response);
    });
}
exports.reactToPostController = reactToPostController;
