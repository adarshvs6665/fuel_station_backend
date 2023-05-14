import { Request, Response } from "express";
import { cartData } from "../data/data";
import { v4 as uuidv4 } from "uuid";
import CartModel from "../models/Cart";
import ProductModel from "../models/Product";
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
    const { data } = req.body;

    // const itemExistsAlready = cartData.some((item: cartDataItem) => {
    //     return (
    //         item.imageUrl === data.imageUrl &&
    //         item.name === data.name &&
    //         item.price === data.price &&
    //         item.review === data.review &&
    //         item.star === data.star &&
    //         item.id === data.id &&
    //         item.value === data.value &&
    //         item.quantity === data.quantity
    //     );
    // });

    // cartData.push(data);

    // console.log(cartData);

    const cartDataExists = await CartModel.findOne({ "item.name": data!.name });
    if (!cartDataExists) {
        const cartItem = new CartModel({
            cartId: uuidv4(),
            item: new ProductModel({
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
    console.log(cartData);

    CartModel.find({})
        .then((cartData) => {
            console.log(cartData);
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
