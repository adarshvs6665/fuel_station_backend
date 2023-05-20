import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Cart from "../models/Cart";
import Product from "../models/Product";
import { IResponse } from "../Interfaces/IResponse";

type cartDataItem = {
    imageUrl: any;
    name: any;
    price: any;
    review: any;
    star: any;
    id: any;
    value: any;
    quantity: any;
};

export const cartUpdateController = async (req: Request, res: Response) => {
    const { data, userId } = req.body;

    const cartDataExists = await Cart.findOne({ "item.name": data!.name });
    if (!cartDataExists) {
        const cartItem = new Cart({
            cartId: uuidv4(),
            userId: userId,
            item: new Product({
                ...data,
            }),
        });

        cartItem.save();

        res.status(200).json({
            status: "success",
            message: "Item added to cart successfully.",
        });
    } else {
        res.status(409).send({
            status: "failed",
            message: "You have already added this item to the cart.",
        });
    }
};

export const cartFetchController = async (req: Request, res: Response) => {
    const { userId } = req.query;

    Cart.find({ userId: userId })
        .then((cartData) => {
            const response: IResponse = {
                status: "success",
                message: "Fetched successfully",
                data: cartData,
            };

            res.status(200).json(response);
        })
        .catch((error) => {
            // Handle any errors that occur during the authentication process
            const response: IResponse = {
                status: "failed",
                message: "internal error",
            };

            res.status(500).json(response);
        });
};

export const cartDeleteController = async (req: Request, res: Response) => {
    const { cartId } = req.body.data;
    Cart.deleteOne({ cartId: cartId })
        .then(() => {
            const response: IResponse = {
                status: "success",
                message: "Removed from cart",
            };
            res.status(200).json(response);
        })
        .catch(() => {
            const response: IResponse = {
                status: "failed",
                message: "Internal error",
            };
            res.status(500).json(response);
        });
};
