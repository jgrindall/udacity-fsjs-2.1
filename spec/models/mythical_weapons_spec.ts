import {MythicalWeapon, MythicalWeaponStore} from "../../src/models/mythical_weapons";
const store = new MythicalWeaponStore();

describe("Test weapons store", ()=>{

    let idCreated: number;

    it("index works", async ()=>{
        const weapons:MythicalWeapon[] = await store.index();
        expect(weapons).toBeTruthy();
        expect(weapons).toEqual([]);
    });


    it("create works", async ()=>{
        const result:MythicalWeapon = await store.create("mjolnir", "hammer", 1000);
        expect(result).toBeTruthy();
        expect(result.name).toEqual("mjolnir");
        expect(result.type).toEqual("hammer");
        expect(result.weight).toEqual(1000);

        const weapons:MythicalWeapon[] = await store.index();
        expect(weapons).toBeTruthy();
        expect(weapons.length).toEqual(1);
        expect(weapons[0].name).toEqual("mjolnir");
        expect(weapons[0].weight).toEqual(1000);
        idCreated = weapons[0].id;
    });

    it("find works", async ()=>{
        const result:MythicalWeapon = await store.find(idCreated);
        expect(result).toBeTruthy();
        expect(result.name).toEqual("mjolnir");
        expect(result.type).toEqual("hammer");
        expect(result.weight).toEqual(1000);
    });

    it("update works", async ()=>{
        const result:MythicalWeapon = await store.update(idCreated, "hammer", "Mjolnir", 2000);
        expect(result.name).toEqual("Mjolnir");
        expect(result.type).toEqual("hammer");
        expect(result.weight).toEqual(2000);
        expect(result.id).toEqual(idCreated);

        const weapons:MythicalWeapon[] = await store.index();
        expect(weapons).toBeTruthy();
        expect(weapons.length).toEqual(1);
        expect(weapons[0].name).toEqual("Mjolnir");
        expect(weapons[0].weight).toEqual(2000);

    });

    it("delete works", async ()=>{
        const result:MythicalWeapon = await store.deleteById(idCreated);
        expect(result.name).toEqual("Mjolnir");
        expect(result.type).toEqual("hammer");
        expect(result.weight).toEqual(2000);
        expect(result.id).toEqual(idCreated);

        const weapons:MythicalWeapon[] = await store.index();
        expect(weapons).toBeTruthy();
        expect(weapons.length).toEqual(0);
        expect(weapons).toEqual([]);

    });

});
