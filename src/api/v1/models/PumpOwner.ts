import mongoose, { Document, Model, Schema } from "mongoose";

interface IPumpOwner extends Document {
    pumpOwnerId: string;
    name: string;
    password: string;
    location: string;
    mobile: string;
    email: string;
    verifyPassword(candidatePassword: string): boolean;
}

const PumpOwnerSchema: Schema<IPumpOwner> = new mongoose.Schema({
    pumpOwnerId: String,
    name: String,
    password: String,
    location: String,
    mobile: String,
    email: String,
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
