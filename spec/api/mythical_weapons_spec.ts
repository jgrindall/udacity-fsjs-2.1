import supertest from "supertest";
import app from "../../src/server";
import {MythicalWeapon} from "../../src/models/mythical_weapons";

const request = supertest(app);

describe("Test endpoint success", async () => {

    it("test list", async () => {
        const response = await request.get("/api/mythical_weapons");
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    let idCreated: number;

    it("test create", async () => {
        const sword = {
            type:"sword",
            name:"Excalibur",
            weight:100
        };
        const response = await request
            .post("/api/mythical_weapons")
            .send(sword);
        expect(response.status).toBe(200);
        const sword2:MythicalWeapon = (response.body as MythicalWeapon);
        expect(sword2).toBeTruthy();
        expect(sword2.name).toEqual(sword.name);

        idCreated = sword2.id;

        const response2 = await request.get("/api/mythical_weapons");
        expect(response2.status).toBe(200);
        const weapons = (response2.body as MythicalWeapon[]);
        expect(weapons).toBeTruthy();
        expect(weapons.length).toEqual(1);
        expect(weapons[0].name).toEqual("Excalibur");
    });

    it("test get by id", async () => {
        const response = await request.get("/api/mythical_weapons/" + idCreated);
        expect(response.status).toBe(200);
        expect(response.body.name).toEqual("Excalibur");
    });

    it("test edit", async()=>{
        const sword = {
            type:"sword",
            name:"Excalibur, sword of kings",
            weight:200
        };
        const response = await request
            .put("/api/mythical_weapons/" + idCreated)
            .send(sword);
        expect(response.status).toBe(200);
        const sword2:MythicalWeapon = (response.body as MythicalWeapon);
        expect(sword2).toBeTruthy();
        expect(sword2.name).toEqual(sword.name);

        const response2 = await request.get("/api/mythical_weapons");
        expect(response2.status).toBe(200);
        const weapons = (response2.body as MythicalWeapon[]);
        expect(weapons).toBeTruthy();
        expect(weapons.length).toEqual(1);
        expect(weapons[0].name).toEqual("Excalibur, sword of kings");
    });

    it("test delete by id", async () => {
        const response = await request.delete("/api/mythical_weapons/" + idCreated);
        expect(response.status).toBe(200);
        const response2 = await request.get("/api/mythical_weapons");
        expect(response2.status).toBe(200);
        expect(response2.body).toEqual([]);
    });

});
