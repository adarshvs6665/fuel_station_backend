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

// for routing user APIs
export const userRouter = express.Router();

// for routing common APIs
export const commonRouter = express.Router();

// for routing pump APIs
export const pumpRouter = express.Router();

// for routing deliveryBoy APIs
export const deliveryRouter = express.Router();



// user routes
userRouter.get("/order", orderController);
userRouter.get("/cart", cartFetchController);
userRouter.post("/cart", cartUpdateController);
userRouter.post("/create-user", userCreateController);
userRouter.post("/login", userAuthenticateController);

// pump routes
pumpRouter.post("/create-pump-owner", pumpOwnerCreateController);
pumpRouter.post("/pump-owner-login", pumpOwnerAuthenticateController);

// delivery routes
deliveryRouter.post("/create-delivery-boy", deliveryBoyCreateController);
deliveryRouter.post("/delivery-boy-login", deliveryBoyAuthenticateController);

// development purpose
commonRouter.post("/default", defaultController);
commonRouter.delete("/reset-cart", (req, res) => {
    console.log(cartData);
    cartData.splice(0, cartData.length);
    console.log(cartData);
    res.send("deleted");
});

// defaultRouter.get("/cart")

