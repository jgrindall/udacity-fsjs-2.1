import client from "../database";
import bcrypt from "bcrypt";
import {Book} from "./book";

export type Users = {
    id: number;
    username: string;
    password_digest: string;
}

const {
    BCRYPT_PASSWORD,
    SALT_ROUNDS
} = process.env;


export class UsersStore{
    constructor() {

    }
    async index(): Promise<Users[]> {
        try {
            const connection = await client.connect();
            const sql = 'select * from users';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get users. Error: ${err}`)
        }
    }

    async create(username:string, password:string): Promise<Users> {
        try {
            const hash = bcrypt.hashSync(
                password + BCRYPT_PASSWORD,
                parseInt(SALT_ROUNDS as string)
            );
            const sql = 'insert into users (username, password_digest) values($1, $2) returning *';
            const connection = await client.connect();
            const result = await connection.query(sql, [username, hash]);
            await connection.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not add new user. Error: ${err}`)
        }
    }

    async authenticate(username:string, password:string): Promise<Users | null> {
        const sql = 'select * from users where username=$1';
        const connection = await client.connect();
        const result = await connection.query(sql, [username]);
        await connection.release();
        if(result.rows.length === 1){
            const user:Users = result.rows[0];
            if(bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password_digest)){
                return user;
            }
        }
        return null;
    }

}

