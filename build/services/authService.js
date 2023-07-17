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
exports.getConnectionsServices = exports.connectUsersService = exports.logInUserService = exports.createUserService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const authRepo_1 = require("../models/repository/authRepo");
const general_1 = require("../helpers/general");
const custom_error_1 = require("../helpers/custom_error");
const auth_validator_1 = require("../inputValidators.ts/auth.validator");
const authModel_1 = __importDefault(require("../models/authModel"));
function createUserService(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, general_1.asyncWrapper)(() => __awaiter(this, void 0, void 0, function* () {
            const { userName, password, email } = (0, auth_validator_1.createUserValidator)(payload);
            console.log(password);
            const userExists = yield (0, authRepo_1.getUserRepository)({ email });
            if (userExists) {
                throw new custom_error_1.catchError("This account already exists");
            }
            const hash = (0, general_1.hashPassword)(password);
            const newuser = yield (0, authRepo_1.createUserRepository)({
                userName,
                password: hash,
                email,
                role: "Blogger"
            });
            newuser.password = "";
            if (newuser instanceof Error) {
                throw new custom_error_1.catchError(newuser.message);
            }
            return (0, general_1.responseHandler)("data saved successfully", newuser);
        }));
    });
}
exports.createUserService = createUserService;
function logInUserService(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, general_1.asyncWrapper)(() => __awaiter(this, void 0, void 0, function* () {
            const { password, email } = (0, auth_validator_1.signInUserValidator)(payload);
            const getUser = yield (0, authRepo_1.getUserRepository)({ email });
            if (getUser instanceof Error) {
                throw new custom_error_1.catchError(getUser.message);
            }
            const isPasswrdSame = (0, general_1.comparePassword)(password, getUser.password);
            if (!isPasswrdSame) {
                throw new custom_error_1.catchError("invalid credentials");
            }
            const token = (0, general_1.generateToken)({
                id: getUser._id,
                role: getUser.role
            });
            return (0, general_1.responseHandler)("data saved successfully", {
                auth_token: token,
                user: getUser
            });
        }));
    });
}
exports.logInUserService = logInUserService;
//follow or unfollow a user
function connectUsersService(followerId, followingId) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = yield mongoose_1.default.startSession();
        try {
            //check if following exists
            const userExist = yield (0, authRepo_1.getUserRepository)({ _id: followingId });
            if (userExist instanceof Error) {
                throw new custom_error_1.catchError(userExist.message);
            }
            //check if the following has this follower
            const isFollower = (userExist.followers).includes(followerId);
            //if isFollower unfollow the user then return
            if (isFollower) {
                const unFollowedUser = yield authModel_1.default.findByIdAndUpdate({ _id: userExist._id }, { "$pull": {
                        followers: followerId
                    } }, { session });
                const unFollowUser = yield authModel_1.default.findByIdAndUpdate({ _id: followerId }, { "$pull": {
                        followings: userExist._id
                    } }, { session });
                return (0, general_1.responseHandler)(`you unfollow ${unFollowedUser.userName}`);
            }
            else {
                //update the folower data (i.e user with the followerId)
                const followUser = yield authModel_1.default.findOneAndUpdate({ _id: followerId.toString() }, { "$push": {
                        followings: userExist._id
                    } }, { session });
                //update the followee data (i.e user with the followingId)
                const c = yield authModel_1.default.findOneAndUpdate({ _id: userExist._id }, { "$push": {
                        followers: followerId
                    } }, { session });
                return (0, general_1.responseHandler)(`you are now following ${userExist.userName}`);
            }
        }
        catch (error) {
            yield session.abortTransaction();
            return new custom_error_1.catchError(error.message, 500);
        }
        finally {
            session.endSession();
        }
    });
}
exports.connectUsersService = connectUsersService;
//get all followers or followings
function getConnectionsServices(authUser, networkType) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, general_1.asyncWrapper)(() => __awaiter(this, void 0, void 0, function* () {
            let network;
            if (networkType === "followers") {
                network = authUser.followers;
                if (!network.length) {
                    throw new custom_error_1.catchError("you dont have any follwers");
                }
            }
            else if (networkType === "followings") {
                network = authUser.followings;
                if (!network.length) {
                    throw new custom_error_1.catchError("you dont have any follwings");
                }
            }
            else {
                throw new custom_error_1.catchError("This network does not exist");
            }
            return (0, general_1.responseHandler)(`${network} retrieved successfully`, network);
        }));
    });
}
exports.getConnectionsServices = getConnectionsServices;
//get all users (admin only)
//reset profile details
//change password while online
//reset password
//upload profile picture
