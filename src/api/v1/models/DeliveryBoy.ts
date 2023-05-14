import mongoose, { Document, Model, Schema } from "mongoose";

interface IDeliveryBoy extends Document {
    deliveryBoyId: string;
    name: string;
    password: string;
    email: string;
    mobile: string;
    verifyPassword(candidatePassword: string): boolean;
}

const DeliveryBoySchema: Schema<IDeliveryBoy> = new mongoose.Schema({
    deliveryBoyId: String,
    name: String,
    password: String,
    mobile: String,
    email: String,
});

// Add a method to compare passwords
DeliveryBoySchema.methods.verifyPassword = function (
    candidatePassword: string
): boolean {
    return candidatePassword === this.password;
};

const DeliveryBoy: Model<IDeliveryBoy> = mongoose.model<IDeliveryBoy>(
    "DeliveryBoy",
    DeliveryBoySchema
);

export default DeliveryBoy;
