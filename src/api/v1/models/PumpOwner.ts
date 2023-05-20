import mongoose, { Document, Model, Schema } from "mongoose";

interface IPumpOwner extends Document {
    pumpOwnerId: string;
    name: string;
    email: string;
    password: string;
    location: {};
    mobile: string;
    locationName: string;
    verifyPassword(candidatePassword: string): boolean;
}

const PumpOwnerSchema: Schema<IPumpOwner> = new mongoose.Schema({
    pumpOwnerId: String,
    name: String,
    email: String,
    password: String,
    location: {},
    mobile: String,
    locationName: String,
});

// Add a method to compare passwords
PumpOwnerSchema.methods.verifyPassword = function (
    candidatePassword: string
): boolean {
    return candidatePassword === this.password;
};

const PumpOwner: Model<IPumpOwner> = mongoose.model<IPumpOwner>(
    "PumpOwner",
    PumpOwnerSchema
);

export default PumpOwner;
