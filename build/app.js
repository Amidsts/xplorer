"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./config/index"));
const logger_1 = __importDefault(require("./helpers/logger"));
const general_1 = require("./helpers/general");
(function () {
    index_1.default.listen((0, general_1.env)("port"), () => {
        logger_1.default.info(`server is listening on port ${(0, general_1.env)("port")}`);
    });
})();
