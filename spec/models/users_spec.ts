import {Users, UsersStore} from "../../src/models/users";
const store = new UsersStore();

describe("Test users store", ()=>{

    it("index works", async ()=>{
        const users:Users[] = await store.index();
        expect(users).toBeTruthy();
        expect(users).toEqual([]);
    });

    it("create works", async ()=>{
        const user:Users = await store.create("jgrindall", "Mountain101");
        expect(user).toBeTruthy();
        expect(user.username).toEqual("jgrindall");
        expect(user.password_digest).not.toEqual("Mountain101");
    });

    it("auth works - success", async ()=>{
        const user = await store.authenticate("jgrindall", "Mountain101");
        expect(user).toBeTruthy();
        expect(user as Users).toBeTruthy();
        expect((user as Users).username).toEqual("jgrindall");
    });

    it("auth works - fail", async ()=>{
        const user = await store.authenticate("jgrindall", "Mountain");
        expect(user).toEqual(null);
    });

    it("auth works - fail missing user", async ()=>{
        const user = await store.authenticate("jg", "Mountain101");
        expect(user).toEqual(null);
    });


});
