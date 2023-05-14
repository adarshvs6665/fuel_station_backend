import mongoose from 'mongoose';

export const dbConnection = async () => {
    await mongoose
    .connect("mongodb://localhost:27017/fuel_station")
    .then(() => {
        console.log("Connected to database");
    })
    .catch((error: any) => {
        console.error("Error connecting to database:", error);
    });
}