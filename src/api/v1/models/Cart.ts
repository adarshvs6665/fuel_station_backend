import mongoose from "mongoose";
import ProductModel from "./Product";

const CartModelSchema = new mongoose.Schema({
    cartId: String,
    item: ProductModel.schema,
});

const CartModel = mongoose.model("CartModel", CartModelSchema);

export default CartModel;
