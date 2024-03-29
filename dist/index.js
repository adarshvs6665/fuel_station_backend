"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const router_1 = require("./api/v1/routes/router");
const db_1 = require("./api/v1/db/db");
//configure env variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
//middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use("/api/v1/common", router_1.commonRouter);
app.use("/api/v1/user", router_1.userRouter);
app.use("/api/v1/pump", router_1.pumpRouter);
app.use("/api/v1/delivery", router_1.deliveryRouter);
app.get("/", (req, res) => {
    res.send("Hello world");
});
app.listen(PORT, () => {
    console.log(`⚡️ [server]: Server is running at http://localhost:${PORT}`);
    (0, db_1.dbConnection)();
});
