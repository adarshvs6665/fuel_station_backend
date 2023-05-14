import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import defaultRouter from "./api/v1/routes/router";
import mongoose from "mongoose";
import { dbConnection } from "./api/v1/db/db";

//configure env variables
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);

app.use("/api/v1/", defaultRouter);

app.listen(PORT, () => {
    console.log(`⚡️ [server]: Server is running at http://localhost:${PORT}`);
    dbConnection();
});



