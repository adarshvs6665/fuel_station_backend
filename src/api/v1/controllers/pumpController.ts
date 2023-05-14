import { Request, Response } from "express";
import PumpOwner from "../models/PumpOwner";
import { IResponse } from "../Interfaces/IResponse";
import { v4 as uuidv4 } from "uuid";

export const pumpOwnerCreateController = async (req: Request, res: Response) => {
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
                req.body.userId = uuidv4();
                const pumpOwner = new PumpOwner(req.body);

                pumpOwner.save();
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

export const pumpOwnerAuthenticateController = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const pumpOwner = await PumpOwner.findOne({ email });

        // handling invalid credentials
        if (!pumpOwner || !pumpOwner!.verifyPassword(password)) {
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

