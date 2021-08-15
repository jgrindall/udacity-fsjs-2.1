import express from "express";
import {MythicalWeaponStore} from "../../models/mythical_weapons";

const store = new MythicalWeaponStore();

export default express
    .Router()
    .get("/mythical_weapons", async (req: express.Request, res: express.Response) => {
        console.log("get all");
        const weapons = await store.index();
        res.json(weapons);
    })
    .get("/mythical_weapons/:id", async (req: express.Request, res: express.Response) => {
        const id = parseInt(req.params.id);
        console.log("get", id);
        const weapon = await store.find(id);
        res.json(weapon);
    })
    .delete("/mythical_weapons/:id", async (req: express.Request, res: express.Response) => {
        const id = parseInt(req.params.id);
        console.log("delete", id);
        const weapon = await store.deleteById(id);
        res.json(weapon);
    })
    .post("/mythical_weapons/:id", async (req: express.Request, res: express.Response) => {
        const body = req.body;
        const id = parseInt(req.params.id);
        console.log("edit", id, body);
        res.json({"ok":1});
    })
    .put("/mythical_weapons", async (req: express.Request, res: express.Response) => {
        const body = req.body;
        console.log("create", body);
        res.json({"ok":1});
    });
