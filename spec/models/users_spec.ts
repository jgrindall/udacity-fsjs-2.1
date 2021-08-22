import {Users, UsersStore} from "../../src/models/users";
const store = new UsersStore();

describe("Test users store", ()=>{

    let idCreated:number;

    afterAll(async()=>{
        return await store.deleteAll();
    });

    beforeAll(async()=>{
        return await store.deleteAll();
    });

    it("index works", async ()=>{
        const users:Users[] = await store.index();
        expect(users).toBeTruthy();
        expect(users).toEqual([]);
    });

    xit("create works", async ()=>{
        const user:Users = await store.create("jgrindall", "Mountain101");
        expect(user).toBeTruthy();
        expect(user.username).toEqual("jgrindall");
        expect(user.password_digest).not.toEqual("Mountain101");
        idCreated = user.id;
    });

    xit("auth works - success", async ()=>{
        const user = await store.authenticate("jgrindall", "Mountain101");
        expect(user).toBeTruthy();
        expect(user as Users).toBeTruthy();
        expect((user as Users).username).toEqual("jgrindall");
    });

    xit("auth works - fail", async ()=>{
        const user = await store.authenticate("jgrindall", "Mountain");
        expect(user).toEqual(null);
    });

    xit("auth works - fail missing user", async ()=>{
        const user = await store.authenticate("jg", "Mountain101");
        expect(user).toEqual(null);
    });

    xit("del works", async ()=>{
        const user = await store.delete(idCreated);
        expect(user).toBeTruthy();
        const users:Users[] = await store.index();
        expect(users).toBeTruthy();
        expect(users).toEqual([]);
    });

    xit("del all works", async ()=>{

        const user:Users = await store.create("jgrindall", "Mountain101");
        expect(user).toBeTruthy();
        expect(user.username).toEqual("jgrindall");
        expect(user.password_digest).not.toEqual("Mountain101");
        idCreated = user.id;
        let users:Users[] = await store.deleteAll();
        expect(users).toBeTruthy();
        users = await store.index();
        expect(users).toBeTruthy();
        expect(users).toEqual([]);
    });

});
