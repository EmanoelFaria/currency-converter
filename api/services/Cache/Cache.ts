import { DatabaseFactory } from "../../../worker/factories/DatabaseFactory/DatabaseFactory";
import { Database } from "../../../worker/models/database/database";

export class Cache {

    DATABASE_CLIENT: Database;
    LOCAL_STORAGE;

    constructor(database_name: string, cache_timeout_minutes:number){
        const databaseFactory = new DatabaseFactory()
        this.DATABASE_CLIENT = databaseFactory.client(database_name);
        this.refresh(cache_timeout_minutes)
    }

    async getValue(key:string){

        let cached_value = this.LOCAL_STORAGE[key]
        if(cached_value) return cached_value; 

        let value = await this.DATABASE_CLIENT.getKey(key)
        this.LOCAL_STORAGE[key] = value

    }

    async refresh(timeout_minute:number){
        
        let storage_keys = Object.keys(this.LOCAL_STORAGE)

        for (const key of storage_keys) {
            try {
                let value = await this.DATABASE_CLIENT.getKey(key)
                this.LOCAL_STORAGE[key] = value          
            } catch (error) {
                console.log(error)
                continue;
            }
        }

        setTimeout(this.refresh, timeout_minute)

    }


}