"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pumpOwnerAuthenticateController = exports.pumpOwnerCreateController = void 0;
const PumpOwner_1 = __importDefault(require("../models/PumpOwner"));
const uuid_1 = require("uuid");
const pumpOwnerCreateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    // checks if user exists
    PumpOwner_1.default.findOne({ email: email })
        .then((existingUser) => {
        if (existingUser) {
            const response = {
                status: "failed",
                message: "Account already exists. Please login",
            };
            res.status(400).json(response);
        }
        else {
            req.body.userId = (0, uuid_1.v4)();
            const pumpOwner = new PumpOwner_1.default(req.body);
            pumpOwner.save();
            const response = {
                status: "success",
                message: "Registration successful",
            };
            res.status(200).json(response);
        }
    })
        .catch((err) => {
        const response = {
            status: "failed",
            message: "Registration failed",
        };
        res.status(404).json(response);
    });
});
exports.pumpOwnerCreateController = pumpOwnerCreateController;
const pumpOwnerAuthenticateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Find the user by email
        const pumpOwner = yield PumpOwner_1.default.findOne({ email });
        // handling invalid credentials
        if (!pumpOwner || !pumpOwner.verifyPassword(password)) {
            const response = {
                status: "failed",
                message: "Invalid email or password",
            };
            res.status(401).json(response);
        }
        else {
            const response = {
                status: "success",
                message: "Login successful",
                data: pumpOwner,
            };
            // User is authenticated
            res.status(200).json(response);
        }
    }
    catch (err) {
        // Handle any errors that occur during the authentication process
        const response = {
            status: "failed",
            message: "internal error",
        };
        res.status(500).json(response);
    }
});
exports.pumpOwnerAuthenticateController = pumpOwnerAuthenticateController;
