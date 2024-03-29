import mongoose from "mongoose";
import Product from "./Product";

const LocationSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
});

const DeliveryPartnerSchema = new mongoose.Schema({
    deliveryPartnerId: String,
    deliveryTime: String,
    deliveryPartnerMobileNumber: String,
    deliveryPartnerLocation: LocationSchema,
});

const OrderSchema = new mongoose.Schema({
    orderId: String,
    userId: String,
    item: Product.schema,
    status: String,
    deliveryPartner: DeliveryPartnerSchema,
    deliveryLocation: LocationSchema,
    accepted: Boolean,
    acceptedPumpId: String,
    deliveryAccepted: Boolean,
    acceptedDeliveryBoyId: String,
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;


