import Client from '../database'
import {Product} from "../models/product";

export class Dashboard {
    // Get all products that have been included in orders
    async getProductsInOrders(): Promise<{name: string, price: number, order_id: string}[]> {
        try {
            const connection = await Client.connect();
            const sql = 'select p.name, p.price, op.order_id from order_products op inner join products p on op.product_id = p.id';
            const result = await connection.query(sql);
            await connection.release();
            return result.rows
        }
        catch (err) {
            throw new Error(`unable get products and orders: ${err}`)
        }
    }

    async getExpensiveProducts(n:number):Promise<Product[]>{
        try {
            const connection = await Client.connect();
            const sql = 'select * from products order by price desc limit $1';
            const result = await connection.query(sql, [n]);
            await connection.release();
            return result.rows
        }
        catch (err) {
            throw new Error(`unable get expensive products: ${err}`)
        }
    }
}