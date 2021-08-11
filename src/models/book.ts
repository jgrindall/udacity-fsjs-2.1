import client from "../database";

export type Book = {
    id: number;
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
            // @ts-ignore
            const connection = await Client.connect();
            const sql = 'SELECT * FROM books';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get books. Error: ${err}`)
        }
    }

    async show(id: string): Promise<Book> {
        try {
            const sql = 'SELECT * FROM books WHERE id=($1)';
            // @ts-ignore
            const connection = await Client.connect();
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
            const sql = 'INSERT INTO books (title, author, total_pages, summary) VALUES($1, $2, $3, $4) RETURNING *';
            // @ts-ignore
            const connection = await Client.connect();
            const result = await connection.query(sql, [b.title, b.author, b.total_pages, b.summary]);
            const book = result.rows[0];
            connection.release();
            return book;
        }
        catch (err) {
            throw new Error(`Could not add new book ${b.title}. Error: ${err}`)
        }
    }

    async delete(id: string): Promise<Book> {
        try {
            const sql = 'DELETE FROM books WHERE id=($1)';
            // @ts-ignore
            const connection = await Client.connect();
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

