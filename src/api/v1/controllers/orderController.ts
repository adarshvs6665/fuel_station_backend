import { Request, Response } from "express";

export const orderController = async (req: Request, res: Response) => {
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
};
