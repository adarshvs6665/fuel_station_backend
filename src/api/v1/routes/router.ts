import express from "express";
import { defaultController } from "../controllers/defaultController";
import { orderFetchController, orderGenerateController } from "../controllers/orderController";
import {
    cartDeleteController,
    cartFetchController,
    cartUpdateController,
} from "../controllers/cartController";
import {
    userAuthenticateController,
    userCreateController,
} from "../controllers/userController";
import {
    pumpOwnerAcceptOrderController,
    pumpOwnerAuthenticateController,
    pumpOwnerCreateController,
    pumpOwnerDetailsFetchController,
    pumpOwnerOrderFetchController,
    pumpOwnerRejectOrderController,
} from "../controllers/pumpController";
import {
    deliveryBoyAuthenticateController,
    deliveryBoyCreateController,
    deliveryBoyOrderAcceptController,
    deliveryBoyOrderCompleteController,
    deliveryBoyOrdersFetchController,
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
userRouter.get("/order", orderFetchController);
userRouter.post("/order", orderGenerateController);
userRouter.get("/cart", cartFetchController);
userRouter.post("/cart", cartUpdateController);
userRouter.delete("/cart", cartDeleteController);
userRouter.post("/create-user", userCreateController);
userRouter.post("/login", userAuthenticateController);

// pump routes
pumpRouter.post("/create-pump-owner", pumpOwnerCreateController);
pumpRouter.post("/pump-owner-login", pumpOwnerAuthenticateController);
pumpRouter.get("/order", pumpOwnerOrderFetchController);
pumpRouter.post("/reject-order", pumpOwnerRejectOrderController);
pumpRouter.post("/accept-order", pumpOwnerAcceptOrderController);
pumpRouter.get("/pump-details", pumpOwnerDetailsFetchController); // 917fbe77-2240-4318-ac02-4cf8c4d47e77

// delivery routes
deliveryRouter.post("/create-delivery-boy", deliveryBoyCreateController);
deliveryRouter.post("/delivery-boy-login", deliveryBoyAuthenticateController);
deliveryRouter.post("/delivery-boy-accept-order", deliveryBoyOrderAcceptController);
deliveryRouter.post("/delivery-boy-complete-order", deliveryBoyOrderCompleteController);
deliveryRouter.get("/fetch-delivery-orders", deliveryBoyOrdersFetchController);

// development purpose
commonRouter.post("/default", defaultController);
// commonRouter.delete("/reset-cart", (req, res) => {
//     console.log(cartData);
//     cartData.splice(0, cartData.length);
//     console.log(cartData);
//     res.send("deleted");
// });

// defaultRouter.get("/cart")

