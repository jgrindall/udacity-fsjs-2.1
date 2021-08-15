import express from "express";
import {Users, UsersStore} from "../../models/users";

const store = new UsersStore();

export default express
    .Router()
    .get("/", async (req: express.Request, res: express.Response) => {
        const users = await store.index();
        res.json(users);
    })
    .get("/:id", async (req: express.Request, res: express.Response) => {
        const id = parseInt(req.params.id);
        const user = await store.find(id);
        res.json(user);
    })
    .delete("/:id", async (req: express.Request, res: express.Response) => {
        const id = parseInt(req.params.id);
        const user = await store.delete(id);
        res.json(user);
    })
    .post("/", async (req: express.Request, res: express.Response) => {
        const body = req.body as {username:string, password:string};
        const user = await store.create(body.username, body.password);
        res.json(user);
    })
    .post("/auth", async (req: express.Request, res: express.Response) => {
        const body = req.body as {username:string, password:string};
        const user = await store.authenticate(body.username, body.password);
        res
            .status(user ? 200 : 401)
            .json(user);
    });

