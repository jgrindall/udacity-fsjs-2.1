import {Dashboard} from "../../src/services/dashboard";

import {OrderStore, Order} from "../../src/models/order";
import {Product, ProductStore} from "../../src/models/product";
import {Users, UsersStore} from "../../src/models/users";

const dashboard:Dashboard = new Dashboard();
const orderStore = new OrderStore();
const userStore = new UsersStore();
const productStore = new ProductStore();

describe("Test dashboard", ()=> {

    let userIdCreated: number;
    let productIdsCreated: number[] = [];
    let orderIdCreated: number;

    afterAll(async () => {
        return await userStore.deleteAll();
    });

    beforeAll(async () => {
        return await userStore.deleteAll();
    });

    it("dashboard workflow", async () => {
        const user: Users = await userStore.create("jgrindall", "Mountain101");
        userIdCreated = user.id;

        const p1: Product = await productStore.create("football", 20);
        const p2: Product = await productStore.create("mug", 6);
        const p3: Product = await productStore.create("book", 10);
        productIdsCreated = [p1.id, p2.id, p3.id];

        const o1: Order = await orderStore.create("active", userIdCreated);
        orderIdCreated = o1.id;

        const productsInOrders: { name: string, price: number, order_id: string }[] = await dashboard.getProductsInOrders();
        expect(productsInOrders.length).toEqual(0);

        const product1: { id: number } = await orderStore.addProductToOrder(10, orderIdCreated, productIdsCreated[0]);
        const product2: { id: number } = await orderStore.addProductToOrder(6, orderIdCreated, productIdsCreated[1]);

        const products:Product[] = await orderStore.getProductsForOrder(orderIdCreated);
        expect(products.length).toEqual(2);

        const productsInOrders2: { name: string, price: number, order_id: string }[] = await dashboard.getProductsInOrders();
        expect(productsInOrders2.length).toEqual(2);

        await orderStore.deleteOrder(orderIdCreated);

        const productsInOrders3: { name: string, price: number, order_id: string }[] = await dashboard.getProductsInOrders();
        expect(productsInOrders3.length).toEqual(0);
    });

    it("dashboard get expensive", async () => {

        const ps:Product[] = await productStore.deleteAll();

        const p1: Product = await productStore.create("p1", 1);
        const p2: Product = await productStore.create("p2", 200);
        const p3: Product = await productStore.create("p3", 3);
        const p4: Product = await productStore.create("p4", 4);
        const p5: Product = await productStore.create("p5", 500);
        const p6: Product = await productStore.create("p6", 6);
        const p7: Product = await productStore.create("p7", 7);
        const p8: Product = await productStore.create("p8", 8);
        const p9: Product = await productStore.create("p9", 9);
        const p10: Product = await productStore.create("p10", 10);

        const products: Product[] = await dashboard.getExpensiveProducts(5);
        expect(products.length).toEqual(5);
        expect(products[0].price).toEqual(500);
        expect(products[1].price).toEqual(200);
        expect(products[2].price).toEqual(10);
        expect(products[3].price).toEqual(9);
        expect(products[4].price).toEqual(8);

    });
});

