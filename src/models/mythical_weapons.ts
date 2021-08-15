import client from "../database";

export type MythicalWeapon  = {
    id:number;
    name:string;
    type:string;
    weight:number;
}

export class MythicalWeaponStore{
    constructor() {
    }
    async index():Promise<MythicalWeapon[]>{
        try{
            const connection = await client.connect();
            const sql = `select * from mythical_weapons`;
            const result = await connection.query(sql);
            await connection.release();
            return result.rows;
        }
        catch(e){
            throw new Error("get weapons error " + e.message);
        }
    }
    async find(id:number):Promise<MythicalWeapon>{
        try{
            const connection = await client.connect();
            const sql = 'select * from mythical_weapons where id=$1';
            const result = await connection.query(sql, [id]);
            await connection.release();
            return result.rows[0];
        }
        catch(e){
            throw new Error("get weapons error " + e.message);
        }
    }
    async create(name:string, type:string, weight:number):Promise<MythicalWeapon>{
        try{
            const connection = await client.connect();
            const sql ='insert into mythical_weapons(name, type, weight) values ($1, $2, $3) returning *';
            const result = await connection.query(sql, [name, type, weight]);
            await connection.release();
            return result.rows[0];
        }
        catch(e){
            throw new Error("create weapons error " + e.message);
        }
    }
    async deleteById(id:number):Promise<MythicalWeapon>{
        try{
            const connection = await client.connect();
            const sql = 'delete from mythical_weapons where id=$1 returning *';
            const result = await connection.query(sql, [id]);
            await connection.release();
            return result.rows[0];
        }
        catch(e){
            throw new Error("delete weapons error " + e.message);
        }
    }
    async update(id:number, newType:string, newName:string, newWeight:number):Promise<MythicalWeapon>{
        try{
            const connection = await client.connect();
            const sql = 'update mythical_weapons set name = $1, type = $2, weight = $3 where id = $4 RETURNING *';
            const result = await connection.query(sql, [newName, newType, newWeight, id]);
            await connection.release();
            return result.rows[0];
        }
        catch(e){
            throw new Error("update weapons error " + e.message);
        }
    }

}
