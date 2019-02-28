import { Database } from "../../models/database/database";
import { Redis } from "../../services/redis/redis";

export class DatabaseFactory {

    public client(database_name:string): Database {

        if(!database_name) throw new Error("Banco de dados não encontrado");
        
        if(database_name == "Redis") {
            const redisClient = new Redis()
            return redisClient
        }

        if(database_name == "Outro banco de dados"){
            //return outro banco de dados
        }
    }

}