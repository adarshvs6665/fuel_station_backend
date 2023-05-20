import { Request, Response } from "express";
import Cart from "../models/Cart";
import { v4 as uuidv4 } from "uuid";
import Order from "../models/Order";
import Product from "../models/Product";

export const orderFetchController = async (req: Request, res: Response) => {
    // const orders = [
    //     {
    //         orderId: "83a4d796-7ae2-4469-9bc6-595ed7937349",
    //         item: {
    //             id: 1,
    //             imageUrl: "assets/images/petrol.jpg",
    //             name: "Product Name",
    //             price: 9.99,
    //             review: 4.5,
    //             star: 4.0,
    //             value: 2,
    //             quantity: "2",
    //         },
    //         status: "PENDING",
    //         deliveryLocation: {
    //             latitude: 8.568625,
    //             longitude: 76.9619567,
    //         },
    //     },
    //     {
    //         orderId: "83a4d796-9bc6-595ed7937349-7ae2-4469",
    //         item: {
    //             id: 1,
    //             imageUrl: "assets/images/petrol.jpg",
    //             name: "Product Name",
    //             price: 9.99,
    //             review: 4.5,
    //             star: 4.0,
    //             value: 2,
    //             quantity: "2",
    //         },
    //         status: "COMPLETED",
    //         deliveryPartner: {
    //             deliveryPartnerId: "DP123",
    //             deliveryTime: "2-3 days",
    //             deliveryPartnerMobileNumber: "9876543210",
    //             deliveryPartnerLocation: {
    //                 latitude: 88.8,
    //                 longitude: 88.9,
    //             },
    //         },
    //         deliveryLocation: {
    //             latitude: 8.568625,
    //             longitude: 76.9619567,
    //         },
    //     },
    //     {
    //         orderId: "83a4d796-9bc6-595ed7937349-7ae2-4469",
    //         item: {
    //             id: 1,
    //             imageUrl: "assets/images/petrol.jpg",
    //             name: "Product Name",
    //             price: 9.99,
    //             review: 4.5,
    //             star: 4.0,
    //             value: 2,
    //             quantity: "2",
    //         },
    //         status: "DELIVERY",
    //         deliveryPartner: {
    //             deliveryPartnerId: "DP123",
    //             deliveryTime: "2-3 days",
    //             deliveryPartnerMobileNumber: "9876543210",
    //             deliveryPartnerLocation: {
    //                 latitude: 88.8,
    //                 longitude: 88.9,
    //             },
    //         },
    //         deliveryLocation: {
    //             latitude: 8.568625,
    //             longitude: 76.9619567,
    //         },
    //     },
    // ];
    const { userId } = req.query;
console.log(userId);

    console.log("hit order");
    const orders = await Order.find({ userId: userId });
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
