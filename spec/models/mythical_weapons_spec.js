"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mythical_weapons_1 = require("../../src/models/mythical_weapons");
const store = new mythical_weapons_1.MythicalWeaponStore();
describe(() => {
    it("index works", () => {
        const weapons = yield store.index();
        expect(weapons).toBeTruthy();
        expect(weapons).toEqual([]);
    });
});
