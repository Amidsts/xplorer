"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCommentValidator = exports.createPostValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const general_1 = require("../helpers/general");
const createPostValidator = (payload) => {
    return (0, general_1.validate)(joi_1.default.object({
        title: joi_1.default.string().required(),
        subtitle: joi_1.default.string().required(),
        body: joi_1.default.string().required(),
        category: joi_1.default.string().valid("Technology", "Lifestyle", "food and Recipe", "DIY", "Entertainment").required()
    }), payload);
};
exports.createPostValidator = createPostValidator;
const postCommentValidator = (payload) => {
    return (0, general_1.validate)(joi_1.default.object({
        comment: joi_1.default.string().required()
    }), payload);
};
exports.postCommentValidator = postCommentValidator;
