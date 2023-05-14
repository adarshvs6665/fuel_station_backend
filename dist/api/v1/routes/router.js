"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deliveryRouter = exports.pumpRouter = exports.commonRouter = exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const defaultController_1 = require("../controllers/defaultController");
const orderController_1 = require("../controllers/orderController");
const cartController_1 = require("../controllers/cartController");
const data_1 = require("../data/data");
const userController_1 = require("../controllers/userController");
const pumpController_1 = require("../controllers/pumpController");
const deliveryController_1 = require("../controllers/deliveryController");
// for routing user APIs
exports.userRouter = express_1.default.Router();
// for routing common APIs
exports.commonRouter = express_1.default.Router();
// for routing pump APIs
exports.pumpRouter = express_1.default.Router();
// for routing deliveryBoy APIs
exports.deliveryRouter = express_1.default.Router();
// user routes
exports.userRouter.get("/order", orderController_1.orderController);
exports.userRouter.get("/cart", cartController_1.cartFetchController);
exports.userRouter.post("/cart", cartController_1.cartUpdateController);
exports.userRouter.post("/create-user", userController_1.userCreateController);
exports.userRouter.post("/login", userController_1.userAuthenticateController);
// pump routes
exports.pumpRouter.post("/create-pump-owner", pumpController_1.pumpOwnerCreateController);
exports.pumpRouter.post("/pump-owner-login", pumpController_1.pumpOwnerAuthenticateController);
// delivery routes
exports.deliveryRouter.post("/create-delivery-boy", deliveryController_1.deliveryBoyCreateController);
exports.deliveryRouter.post("/delivery-boy-login", deliveryController_1.deliveryBoyAuthenticateController);
// development purpose
exports.commonRouter.post("/default", defaultController_1.defaultController);
exports.commonRouter.delete("/reset-cart", (req, res) => {
    console.log(data_1.cartData);
    data_1.cartData.splice(0, data_1.cartData.length);
    console.log(data_1.cartData);
    res.send("deleted");
});
// defaultRouter.get("/cart")
