import client from "../database";

export type Product = {
    id:number;
    name: string;
    price: number;
}

export class ProductStore{
    constructor() {

    }
    async index(): Promise<Product[]> {
        try {
            const connection = await client.connect();
            const sql = 'select * from products';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get products. Error: ${err}`)
        }
    }

    async find(id:number):Promise<Product>{
        try{
            const connection = await client.connect();
            const sql = 'select * from products where id=$1';
            const result = await connection.query(sql, [id]);
            await connection.release();
            return result.rows[0];
        }
        catch(e){
            throw new Error("get products error " + e.message);
        }
    }

    async create(name:string, price:number): Promise<Product> {
        try {
            const sql = 'insert into products (name, price) values($1, $2) returning *';
            const connection = await client.connect();
            const result = await connection.query(sql, [name, price]);
            await connection.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not add new product. Error: ${err}`)
        }
    }

}

