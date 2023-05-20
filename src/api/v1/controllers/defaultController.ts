import { Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User";

export const defaultController = async (req: Request, res: Response) => {
    // const user = new User({name: "Adarsh", salary: 100});
    // user.save();

    console.log(req.body);
    

    res.status(200).json({ data: "hii" });
};
