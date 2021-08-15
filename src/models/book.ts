import client from "../database";

export type Book = {
    id?: number;
    title: string;
    author: string;
    total_pages: number;
    summary: string;
}

export class BookStore{
    constructor() {
    }
    async index(): Promise<Book[]> {
        try {
            const connection = await client.connect();
            const sql = 'select * from books';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get books. Error: ${err}`)
        }
    }

    async show(id: number): Promise<Book> {
        try {
            const sql = 'select * from books where id=($1)';
            const connection = await client.connect();
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find book ${id}. Error: ${err}`);
        }
    }

    async create(b: Book): Promise<Book> {
        try {
            const sql = 'insert into books (title, author, total_pages, summary) values($1, $2, $3, $4) returning *';
            const connection = await client.connect();
            const result = await connection.query(sql, [b.title, b.author, b.total_pages, b.summary]);
            const book = result.rows[0];
            connection.release();
            return book;
        }
        catch (err) {
            throw new Error(`Could not add new book ${b.title}. Error: ${err}`)
        }
    }

    async delete(id: number): Promise<Book> {
        try {
            const sql = 'delete from books WHERE id=$1 returning *';
            const connection = await client.connect();
            const result = await connection.query(sql, [id]);
            const book = result.rows[0];
            connection.release();
            return book;
        }
        catch (err) {
            throw new Error(`Could not delete book ${id}. Error: ${err}`);
        }
    }

}

