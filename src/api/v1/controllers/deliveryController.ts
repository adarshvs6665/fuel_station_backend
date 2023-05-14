import { Request, Response } from "express";
import DeliveryBoy from "../models/DeliveryBoy";
import { IResponse } from "../Interfaces/IResponse";
import { v4 as uuidv4 } from "uuid";

export const deliveryBoyCreateController = async (
    req: Request,
    res: Response
) => {
    const { email } = req.body;

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
                req.body.userId = uuidv4();
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
