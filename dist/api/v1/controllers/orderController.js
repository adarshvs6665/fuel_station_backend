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
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const orderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const orders = [
    //     {
    //         name: "Diesel",
    //         deliveryTime: "Today 7:30 pm",
    //         price: 12.99,
    //         image: "assets/images/diesel.jpg",
    //         completed: false,
    //         quantity: "1L",
    //     },
    //     {
    //         name: "Petrol",
    //         deliveryTime: "Tomorrow 1:00 pm",
    //         price: 8.99,
    //         image: "assets/images/petrol.jpg",
    //         completed: true,
    //         quantity: "2L",
    //     },
    //     {
    //         name: "Kerosene",
    //         deliveryTime: "Today 8:00 pm",
    //         price: 18.99,
    //         image: "assets/images/kerosene.jpg",
    //         completed: true,
    //         quantity: "1L",
    //     },
    //     {
    //         name: "Kerosene",
    //         deliveryTime: "Today 8:00 pm",
    //         price: 18.99,
    //         image: "assets/images/kerosene.jpg",
    //         completed: true,
    //         quantity: "1L",
    //     },
    //     {
    //         name: "Kerosene",
    //         deliveryTime: "Today 8:00 pm",
    //         price: 18.99,
    //         image: "assets/images/kerosene.jpg",
    //         completed: true,
    //         quantity: "1L",
    //     },
    // ];
    const orders = [
        {
            orderId: "12345",
            item: {
                id: 1,
                imageUrl: "assets/images/petrol.jpg",
                name: "Product Name",
                price: 9.99,
                review: 4.5,
                star: 4.0,
                value: 2,
                quantity: "2",
            },
            status: "Pending",
            deliveryPartner: {
                deliveryPartnerId: "DP123",
                deliveryTime: "2-3 days",
                deliveryPartnerMobileNumber: "9876543210",
                deliveryPartnerLocation: "City, Country",
            },
        },
    ];
    console.log("hit order");
    res.status(200).json(orders);
});
exports.orderController = orderController;
