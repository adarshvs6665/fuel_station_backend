import { Request, Response } from "express";
import DeliveryBoy from "../models/DeliveryBoy";
import { IResponse } from "../Interfaces/IResponse";
import { v4 as uuidv4 } from "uuid";
import Order from "../models/Order";
import PumpOwner from "../models/PumpOwner";

export const deliveryBoyCreateController = async (
    req: Request,
    res: Response
) => {
    const { email } = req.body;
console.log(req.body);

    // checks if user exists
    DeliveryBoy.findOne({ email: email })
        .then((existingUser) => {
            if (existingUser) {
                const response: IResponse = {
                    status: "failed",
                    message: "Account already exists. Please login",
                };
                res.status(400).json(response);
            } else {
                req.body.deliveryBoyId = uuidv4();
                const deliveryBoy = new DeliveryBoy(req.body);

                deliveryBoy.save();
                const response: IResponse = {
                    status: "success",
                    message: "Registration successful",
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

export const deliveryBoyAuthenticateController = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { email, password } = req.body;
    
    try {
        // Find the user by email
        const deliveryBoy = await DeliveryBoy.findOne({ email });
        
        // handling invalid credentials
        if (!deliveryBoy || !deliveryBoy!.verifyPassword(password)) {
            const response: IResponse = {
                status: "failed",
                message: "Invalid email or password",
            };
            res.status(401).json(response);
        } else {
            const response: IResponse = {
                status: "success",
                message: "Login successful",
                data: deliveryBoy,
            };
            console.log("hit");

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

export const deliveryBoyOrdersFetchController = async (
    req: Request,
    res: Response
) => {
    const { deliveryBoyId } = req.query;
    console.log("hit");
    console.log(deliveryBoyId);

    try {
        const ordersForDelivery = await Order.find({
            status: "DELIVERY",
        }).lean();

        let acceptedFlag = false;
        const ordersFinal = await Promise.all(
            ordersForDelivery.map(async (order) => {
                const pumpOwner = await PumpOwner.findOne({
                    pumpOwnerId: order.acceptedPumpId,
                });

                if (!order.deliveryAccepted) {
                    return {
                        ...order,
                        pickupLocation: pumpOwner?.location,
                        acceptedByMe: false,
                    };
                } else if (order.acceptedDeliveryBoyId == deliveryBoyId) {
                    acceptedFlag = true;
                    return {
                        ...order,
                        pickupLocation: pumpOwner?.location,
                        acceptedByMe: true,
                    };
                } else {
                    return;
                }
            })
        );

        const filteredArray = ordersFinal.filter(
            (item: any) => item !== null && item !== undefined
        );
        console.log(filteredArray);

        res.json({ data: filteredArray, acceptedFlag });
    } catch (error) {
        console.error(error);
        const response: IResponse = {
            status: "failed",
            message: "Internal error",
        };
        res.status(500).json(response);
    }
};

export const deliveryBoyOrderCompleteController = async (
    req: Request,
    res: Response
) => {
    const { orderId } = req.body.data;

    const updatedOrder = await Order.findOneAndUpdate(
        {
            orderId: orderId,
        },
        {
            status: "COMPLETED",
        },
        { new: true }
    ).lean();

    res.status(200).send("done");
};

export const deliveryBoyOrderAcceptController = async (
    req: Request,
    res: Response
) => {
    const { deliveryBoyId, orderId, deliveryPartnerLocation, deliveryTime } =
        req.body.data;
    try {
        const deliveryBoy = await DeliveryBoy.findOne({
            deliveryBoyId: deliveryBoyId,
        });
        const updatedOrder = await Order.findOneAndUpdate(
            {
                orderId: orderId,
            },
            {
                deliveryAccepted: true,
                acceptedDeliveryBoyId: deliveryBoyId,
                status: "DELIVERY",
                deliveryPartner: {
                    deliveryPartnerId: deliveryBoyId,
                    deliveryTime: deliveryTime,
                    deliveryPartnerMobileNumber: deliveryBoy?.mobile,
                    deliveryPartnerLocation: deliveryPartnerLocation,
                },
            },
            { new: true }
        ).lean();

        if (!updatedOrder) {
            console.log("cant accept");

            // Handle case when order is not found
            const response: IResponse = {
                status: "failed",
                message: "Cannot accept order",
            };

            res.status(404).json(response);
            return;
        }

        const response: IResponse = {
            status: "success",
            message: "Order accepted successfully",
            data: updatedOrder,
        };
        console.log("ok");
        res.status(200).json(response);
    } catch (error) {
        // Handle any errors that occur during the update process
        const response: IResponse = {
            status: "failed",
            message: "Internal error",
        };
        console.log(error);

        res.status(500).json(response);
    }
};
