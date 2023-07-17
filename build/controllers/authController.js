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
exports.getFollowingsController = exports.getFollowersController = exports.connectUsersController = exports.logInUserController = exports.createUserController = void 0;
const authService_1 = require("../services/authService");
function createUserController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, authService_1.createUserService)(req.body);
        return res.status(response.statusCode).json(response);
    });
}
exports.createUserController = createUserController;
function logInUserController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, authService_1.logInUserService)(req.body);
        return res.status(response.statusCode).json(response);
    });
}
exports.logInUserController = logInUserController;
function connectUsersController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user } = res.locals;
        const response = yield (0, authService_1.connectUsersService)(user._id, req.body.userId);
        return res.status(response.statusCode).json(response);
    });
}
exports.connectUsersController = connectUsersController;
function getFollowersController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user } = res.locals;
        const response = yield (0, authService_1.getConnectionsServices)(user, "followers");
        return res.status(response.statusCode).json(response);
    });
}
exports.getFollowersController = getFollowersController;
function getFollowingsController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user } = res.locals;
        const response = yield (0, authService_1.getConnectionsServices)(user, "followings");
        return res.status(response.statusCode).json(response);
    });
}
exports.getFollowingsController = getFollowingsController;
