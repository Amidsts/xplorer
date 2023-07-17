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
exports.uploadPicsRepository = exports.updateUserDataRepository = exports.getUsersRepository = exports.getUserRepository = exports.createUserRepository = void 0;
const authModel_1 = __importDefault(require("../authModel"));
const general_1 = require("../../helpers/general");
//createUser
function createUserRepository(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, general_1.asyncWrapper)(() => __awaiter(this, void 0, void 0, function* () {
            const newUser = yield new authModel_1.default(payload).save();
            return newUser;
        }));
    });
}
exports.createUserRepository = createUserRepository;
//get user
function getUserRepository(payload, excludeField) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, general_1.asyncWrapper)(() => __awaiter(this, void 0, void 0, function* () {
            if (excludeField) {
                const getUser = yield authModel_1.default.findOne(payload).select("-password");
                return getUser;
            }
            const getUser = yield authModel_1.default.findOne(payload);
            return getUser;
        }));
    });
}
exports.getUserRepository = getUserRepository;
function getUsersRepository(page, perPage) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, general_1.asyncWrapper)(() => __awaiter(this, void 0, void 0, function* () {
            const getUsers = yield authModel_1.default.find().select("-password");
            return getUsers;
        }));
    });
}
exports.getUsersRepository = getUsersRepository;
function updateUserDataRepository(filter, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, general_1.asyncWrapper)(() => __awaiter(this, void 0, void 0, function* () {
            const updateUserData = yield authModel_1.default.findOneAndUpdate(filter, payload);
            return updateUserData;
        }));
    });
}
exports.updateUserDataRepository = updateUserDataRepository;
//update profile picture
function uploadPicsRepository() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.uploadPicsRepository = uploadPicsRepository;
//follow user
// export async function followUserDataRepository(userId: string, payload: {[key:string]: any}): Promise<any> {
//     return await asyncWrapper( async() => {
//         const updateUserData = await user.findByIdAndUpdate(userId, payload)
//         return updateUserData
//     })
// }
//unfollow user
//getUsers
//getuser
//getfollowers
//getFollowing
//
