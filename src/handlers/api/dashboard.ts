import express from "express";
import {Dashboard} from "../../services/dashboard";

const dashboard:Dashboard = new Dashboard();

export default express
    .Router()
    .get("/productsInOrders", async (req: express.Request, res: express.Response) => {
        const products = await dashboard.getProductsInOrders();
        res.json(products);
    })
