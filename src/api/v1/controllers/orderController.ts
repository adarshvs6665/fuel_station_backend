import { Request, Response } from "express";
import Cart from "../models/Cart";
import { v4 as uuidv4 } from "uuid";
import Order from "../models/Order";
import Product from "../models/Product";

export const orderFetchController = async (req: Request, res: Response) => {
    const { userId } = req.query;
    console.log(userId);

    console.log("hit order");
    console.log(userId);
    const orders = await Order.find({ userId: userId });
    console.log(orders);
    
    res.status(200).json(orders);
};

export const orderGenerateController = async (req: Request, res: Response) => {
    const { cartData, position, userId } = req.body;

    console.log("hit");
    
    

    try {
        cartData.map((data: any) => {
            const orderItem = new Order({
                userId: userId,
                orderId: uuidv4(),
                item: new Product({
                    ...data.item,
                }),
                status: "PENDING",
                deliveryLocation: position,
                accepted: false,
                accetedPumpId: "",
            });
            orderItem.save();
        });

        await Cart.deleteMany({ userId: userId });
        res.status(200).json({
            status: "success",
            message: "Order placed successfully.",
        });
    } catch (error) {
        res.status(500).send({
            status: "failed",
            message: "Internal error.",
        });
    }
};
