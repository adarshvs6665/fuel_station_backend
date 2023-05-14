import mongoose from "mongoose";
import Product from "./Product";

const CartModelSchema = new mongoose.Schema({
    cartId: String,
    item: Product.schema,
});

const Cart = mongoose.model("Cart", CartModelSchema);

export default Cart;
