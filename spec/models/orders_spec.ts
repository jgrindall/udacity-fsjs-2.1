import {OrderStore, Order} from "../../src/models/order";
import {Product, ProductStore} from "../../src/models/product";
import {Users, UsersStore} from "../../src/models/users";

const orderStore = new OrderStore();
const userStore = new UsersStore();
const productStore = new ProductStore();

describe("Test orders store", ()=>{

    let userIdCreated:number;
    let productIdsCreated:number[] = [];
    let orderIdCreated: number;

    afterAll(async()=>{
        return await userStore.deleteAll();
    });

    beforeAll(async()=>{
        return await userStore.deleteAll();
    });

    it("create a user", async()=>{
        const user:Users = await userStore.create("jgrindall", "Mountain101");
        console.log(user);
        expect(user).toBeTruthy();
        expect(user.username).toEqual("jgrindall");
        userIdCreated = user.id;
    });

    it("index works", async ()=>{
        const products:Product[] = await productStore.index();
        expect(products).toBeTruthy();
        expect(products).toEqual([]);

        const orders:Order[] = await orderStore.index();
        expect(orders).toBeTruthy();
        expect(orders).toEqual([]);
    });

    it("create products works", async ()=>{
        const p1:Product = await productStore.create("football", 20);
        expect(p1).toBeTruthy();
        expect(p1.price).toEqual(20);

        const p2:Product = await productStore.create("mug", 6);
        expect(p2).toBeTruthy();
        expect(p2.price).toEqual(6);

        const p3:Product = await productStore.create("book", 10);
        expect(p3).toBeTruthy();
        expect(p3.price).toEqual(10);

        const products:Product[] = await productStore.index();
        expect(products).toBeTruthy();
        expect(products.length).toEqual(3);

        productIdsCreated = [p1.id, p2.id, p3.id];
    });

    it("create order works", async ()=>{
        const o1:Order = await orderStore.create("active", userIdCreated);
        expect(o1).toBeTruthy();
        expect(o1.status).toEqual("active");
        orderIdCreated = o1.id;

        const orders:Order[] = await orderStore.index();
        expect(orders).toBeTruthy();
        expect(orders.length).toEqual(1);
    });

    it("list products", async ()=>{
        const products:Product[] = await orderStore.getProductsForOrder(orderIdCreated);
        expect(products).toBeTruthy();
        expect(products).toEqual([]);
    });

    it("adds a product", async ()=>{
        const product1:{id:number} = await orderStore.addProductToOrder(10, orderIdCreated, productIdsCreated[0]);
        const product2:{id:number} = await orderStore.addProductToOrder(6, orderIdCreated, productIdsCreated[1]);
        const product3:{id:number} = await orderStore.addProductToOrder(3, orderIdCreated, productIdsCreated[2]);

        expect(product1).toBeTruthy();
        expect(product2).toBeTruthy();
        expect(product3).toBeTruthy();

        expect(product2.id).toEqual(product1.id + 1);
        expect(product3.id).toEqual(product2.id + 1);

    });

    xit("list products", async ()=>{
        const products:Product[] = await orderStore.getProductsForOrder(orderIdCreated);
        expect(products).toBeTruthy();
        expect(products.length).toEqual(3);
    });

});

