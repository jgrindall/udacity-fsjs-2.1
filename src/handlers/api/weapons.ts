import express from "express";
import {MythicalWeapon, MythicalWeaponStore} from "../../models/mythical_weapons";
import jwt from "jsonwebtoken";
import verifyAuth from "../middleware/auth";

const JWT_TOKEN_SECRET:string = process.env.JWT_TOKEN_SECRET as string;

const store = new MythicalWeaponStore();

export default express
    .Router()
    .get("/", async (req: express.Request, res: express.Response) => {
        const weapons = await store.index();
        res
            .status(200)
            .json(weapons);
    })
    .get("/:id", async (req: express.Request, res: express.Response) => {
        const id = parseInt(req.params.id);
        const weapon = await store.find(id);
        res
            .status(200)
            .json(weapon);
    })
    .delete("/:id", async (req: express.Request, res: express.Response) => {
        const id = parseInt(req.params.id);
        const weapon = await store.deleteById(id);
        res
            .status(200)
            .json(weapon);
    })
    .put("/:id", async (req: express.Request, res: express.Response) => {
        const body = req.body as MythicalWeapon;
        const id = parseInt(req.params.id);
        const weapon = await store.update(id, body.type, body.name, body.weight);
        res
            .status(200)
            .json(weapon);
    })
    .post("/", [verifyAuth], async (req: express.Request, res: express.Response) => {
        const body = req.body as MythicalWeapon;
        const weapon = await store.create(body.name, body.type, body.weight);
        res
            .status(200)
            .json(weapon);
    });
