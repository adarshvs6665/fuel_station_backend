import mongoose from "mongoose";
import Product from "./Product";

const rejectedOrderSchema = new mongoose.Schema({
    orderId: String,
    pumpOwnerId: String,
});

const RejectedOrder = mongoose.model("RejectedOrder", rejectedOrderSchema);

export default RejectedOrder;
