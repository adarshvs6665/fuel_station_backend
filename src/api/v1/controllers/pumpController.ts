import { Request, Response } from "express";
import PumpOwner from "../models/PumpOwner";
import { IResponse } from "../Interfaces/IResponse";
import { v4 as uuidv4 } from "uuid";
import Order from "../models/Order";
import RejectedOrder from "../models/RejectedOrder";

export const pumpOwnerCreateController = async (
    req: Request,
    res: Response
) => {
    const { email } = req.body;

    // checks if user exists
    PumpOwner.findOne({ email: email })
        .then((existingUser) => {
            if (existingUser) {
                const response: IResponse = {
                    status: "failed",
                    message: "Account already exists. Please login",
                };
                res.status(400).json(response);
            } else {
                req.body.pumpOwnerId = uuidv4();
                const pumpOwner = new PumpOwner(req.body);
                pumpOwner.save();

                const response: IResponse = {
                    status: "success",
                    message: "Registered Successfully. Login to continue",
                };
                res.status(200).json(response);
            }
        })
        .catch((err: any) => {
            const response: IResponse = {
                status: "failed",
                message: "Registration failed",
            };
            res.status(404).json(response);
        });
};

export const pumpOwnerAuthenticateController = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const pumpOwner = await PumpOwner.findOne({ email });

        // handling invalid credentials
        if (!pumpOwner) {
            const response: IResponse = {
                status: "failed",
                message: "Invalid email or password",
            };
            res.status(401).json(response);
        } else if (!pumpOwner!.verifyPassword(password)) {
            const response: IResponse = {
                status: "failed",
                message: "Invalid email or password",
            };
            res.status(401).json(response);
        } else {
            const response: IResponse = {
                status: "success",
                message: "Login successful",
                data: pumpOwner,
            };

            // User is authenticated
            res.status(200).json(response);
        }
    } catch (err) {
        // Handle any errors that occur during the authentication process
        const response: IResponse = {
            status: "failed",
            message: "internal error",
        };

        res.status(500).json(response);
    }
};

export const pumpOwnerOrderFetchController = async (
    req: Request,
    res: Response
) => {
    const { pumpOwnerId } = req.query;

    try {
        const orders = await Order.find().lean();

        const updatedOrders: any = await Promise.all(
            orders.map(async (order) => {
                if (!order.accepted) {
                    const rejectedOrder = await RejectedOrder.findOne({
                        orderId: order.orderId,
                        pumpOwnerId: pumpOwnerId,
                    });

                    if (rejectedOrder) {
                        return {
                            ...order,
                            rejected: true,
                        };
                    } else {
                        return {
                            ...order,
                            rejected: false,
                        };
                    }
                } else if (order.acceptedPumpId == pumpOwnerId) {
                    return {
                        ...order,
                        rejected: false,
                    };
                }
            })
        );
        const filteredArray = updatedOrders.filter(
            (item: any) => item !== null && item !== undefined
        );

        const response: IResponse = {
            status: "success",
            message: "Fetched order successfully",
            data: filteredArray,
        };

        console.log(filteredArray);
        
        res.status(200).json(response);
    } catch (error) {
        // Handle any errors that occur during the authentication process
        const response: IResponse = {
            status: "failed",
            message: "internal error",
        };

        res.status(500).json(response);
    }
};

export const pumpOwnerRejectOrderController = async (
    req: Request,
    res: Response
) => {
    const { pumpOwnerId, orderId } = req.body;

    try {
        const existingOrder = await RejectedOrder.findOne({
            orderId,
            pumpOwnerId,
        });

        if (existingOrder) {
            const response: IResponse = {
                status: "failed",
                message: "Order already rejected",
            };
            res.status(409).json(response);
        } else {
            const order = await Order.findOneAndUpdate({orderId}, {status: "REJECTED"})
            order
            const rejectedOrder = new RejectedOrder({
                orderId,
                pumpOwnerId,
            });
            await rejectedOrder.save();
            const response: IResponse = {
                status: "failed",
                message: "Order rejected successfully",
            };
            res.status(200).json(response);
        }
    } catch (error) {
        // Handle any errors that occur during the authentication process
        const response: IResponse = {
            status: "failed",
            message: "internal error",
        };

        res.status(500).json(response);
    }
};

export const pumpOwnerAcceptOrderController = async (
    req: Request,
    res: Response
) => {
    const { pumpOwnerId, orderId } = req.body;

    try {
        const updatedOrder = await Order.findOneAndUpdate(
            {
                orderId: orderId,
            },
            {
                accepted: true,
                acceptedPumpId: pumpOwnerId,
                deliveryAccepted: false,
                status: "DELIVERY",
            },
            { new: true }
        ).lean();

        if (!updatedOrder) {
            // Handle case when order is not found
            const response: IResponse = {
                status: "failed",
                message: "Order not found",
            };

            res.status(404).json(response);
            return;
        }

        const response: IResponse = {
            status: "success",
            message: "Order updated successfully",
            data: updatedOrder,
        };

        res.status(200).json(response);
    } catch (error) {
        // Handle any errors that occur during the update process
        const response: IResponse = {
            status: "failed",
            message: "Internal error",
        };

        res.status(500).json(response);
    }
};

export const pumpOwnerDetailsFetchController = async (
    req: Request,
    res: Response
) => {
    const { pumpOwnerId } = req.query;

    try {
        PumpOwner.findOne({ pumpOwnerId: pumpOwnerId }).then((owner) => {
            const { password, ...ownerWithoutPassword } = owner!.toObject();
            const response: IResponse = {
                status: "success",
                message: "Details fetched successfully",
                data: ownerWithoutPassword,
            };
            res.status(200).json(response);
        });
    } catch (error) {
        // Handle any errors that occur during the authentication process
        const response: IResponse = {
            status: "failed",
            message: "internal error",
        };

        res.status(500).json(response);
    }
};
