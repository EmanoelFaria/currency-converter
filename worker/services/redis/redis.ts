
import * as redis from 'redis';
import { Database } from '../../models/database/database'

export class Redis implements Database {

    CLIENT;
    HOST;

    constructor(host?:string){

        this.setHost(process.env.REDIS_HOST)

        this.CLIENT = redis.createClient(this.HOST)
        this.CLIENT.on("error", (e) => console.log("Error " + e));
        this.CLIENT.on("ready",() => console.log("Redis ready"));
        
    }

    /**
     * @description setKey is responsible for saving to the Redis database a key and value associated with it specified in the parameters
     * @param {String} key - Name of key 
     * @param {Object} value - Value of Key
     */
    setKey(key,value){
        return new Promise((resolve,reject)=>{
            this.CLIENT.set(key, value, (err,r)=>{
                if(err) {
                    reject()
                    return
                }
                resolve()
            });
        })
    }

    setHost(host){
        if(!host) throw new Error("Não foi encontrado o host do Servidor de Cache Redis")
        this.HOST = host
    }

    /**
     * @description getKey is responsible for searching the Redis database for the value of the key specified in the parameters
     * @param {String} key - Name of the key you want to redeem
     * @returns {Object} 
     */
    getKey(key){
        return new Promise((resolve,reject)=>{
            this.CLIENT.get(key, function(err,r){
                if(r){
                    resolve(r)
                    return
                }

                if(err){
                    reject(err)
                    return
                }
            })
        })
    }
}