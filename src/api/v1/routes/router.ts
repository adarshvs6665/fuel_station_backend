import express from "express";
import { defaultController } from "../controllers/defaultController";
import { orderController } from "../controllers/orderController";
import {
    cartFetchController,
    cartUpdateController,
} from "../controllers/cartController";
import { cartData } from "../data/data";
import {
    userAuthenticateController,
    userCreateController,
} from "../controllers/userController";
import {
    pumpOwnerAuthenticateController,
    pumpOwnerCreateController,
} from "../controllers/pumpController";
import {
    deliveryBoyAuthenticateController,
    deliveryBoyCreateController,
} from "../controllers/deliveryController";

const defaultRouter = express.Router();

defaultRouter.get("/order", orderController);

defaultRouter.get("/cart", cartFetchController);

defaultRouter.post("/cart", cartUpdateController);

// user routes
// user create
defaultRouter.post("/create-user", userCreateController);
// user login
defaultRouter.post("/login", userAuthenticateController);

// pump owner routes
defaultRouter.post("/create-pump-owner", pumpOwnerCreateController);
// user login
defaultRouter.post("/pump-owner-login", pumpOwnerAuthenticateController);

// pump owner routes
defaultRouter.post("/create-delivery-boy", deliveryBoyCreateController);
// user login
defaultRouter.post("/delivery-boy-login", deliveryBoyAuthenticateController);

// development purpose
defaultRouter.delete("/reset-cart", (req, res) => {
    console.log(cartData);
    cartData.splice(0, cartData.length);
    console.log(cartData);
    res.send("deleted");
});

// development purpose
defaultRouter.post("/default", defaultController);

// defaultRouter.get("/cart")

//exporting router
export default defaultRouter;
