"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const defaultController_1 = require("../controllers/defaultController");
const orderController_1 = require("../controllers/orderController");
const defaultRouter = express_1.default.Router();
defaultRouter.get("/default", defaultController_1.defaultController);
defaultRouter.get("/order", orderController_1.orderController);
// defaultRouter.get("/cart")
//exporting router
exports.default = defaultRouter;
