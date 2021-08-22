import express from "express";
import {ProductStore} from "../../models/product";

const store = new ProductStore();

export default express
    .Router()
    .get("/", async (req: express.Request, res: express.Response) => {
        const orders = await store.index();
        res.json(orders);
    })
    .get("/:id", async (req: express.Request, res: express.Response) => {
        const id = parseInt(req.params.id);
        const order = await store.find(id);
        res.json(order);
    })
    .post("/", async (req: express.Request, res: express.Response) => {
        const body = req.body as {name:string, price:number};
        const user = await store.create(body.name, body.price);
        res.json(user);
    })

