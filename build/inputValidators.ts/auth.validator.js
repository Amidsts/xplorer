"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInUserValidator = exports.createUserValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const general_1 = require("../helpers/general");
const createUserValidator = (payload) => {
    return (0, general_1.validate)(joi_1.default.object({
        userName: joi_1.default.string().invalid(" ").required(),
        email: joi_1.default.string().trim().email().required(),
        password: joi_1.default.string().min(8).alphanum().invalid(" ").required()
    }), payload);
};
exports.createUserValidator = createUserValidator;
const signInUserValidator = (payload) => {
    return (0, general_1.validate)(joi_1.default.object({
        email: joi_1.default.string().trim().email().required(),
        password: joi_1.default.string().invalid(" ").required()
    }), payload);
};
exports.signInUserValidator = signInUserValidator;
