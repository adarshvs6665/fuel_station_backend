"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const defaultController_1 = require("../controllers/defaultController");
const orderController_1 = require("../controllers/orderController");
const cartController_1 = require("../controllers/cartController");
const data_1 = require("../data/data");
const userController_1 = require("../controllers/userController");
const pumpController_1 = require("../controllers/pumpController");
const deliveryController_1 = require("../controllers/deliveryController");
const defaultRouter = express_1.default.Router();
defaultRouter.get("/order", orderController_1.orderController);
defaultRouter.get("/cart", cartController_1.cartFetchController);
defaultRouter.post("/cart", cartController_1.cartUpdateController);
// user routes
// user create
defaultRouter.post("/create-user", userController_1.userCreateController);
// user login
defaultRouter.post("/login", userController_1.userAuthenticateController);
// pump owner routes
defaultRouter.post("/create-pump-owner", pumpController_1.pumpOwnerCreateController);
// user login
defaultRouter.post("/pump-owner-login", pumpController_1.pumpOwnerAuthenticateController);
// pump owner routes
defaultRouter.post("/create-delivery-boy", deliveryController_1.deliveryBoyCreateController);
// user login
defaultRouter.post("/delivery-boy-login", deliveryController_1.deliveryBoyAuthenticateController);
// development purpose
defaultRouter.delete("/reset-cart", (req, res) => {
    console.log(data_1.cartData);
    data_1.cartData.splice(0, data_1.cartData.length);
    console.log(data_1.cartData);
    res.send("deleted");
});
// development purpose
defaultRouter.post("/default", defaultController_1.defaultController);
// defaultRouter.get("/cart")
//exporting router
exports.default = defaultRouter;
