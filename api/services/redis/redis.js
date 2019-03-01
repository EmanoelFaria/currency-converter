"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis = require("redis");
class Redis {
    constructor(host) {
        this.setHost(process.env.REDIS_HOST);
        this.CLIENT = redis.createClient(this.HOST);
        this.CLIENT.on("error", (e) => console.log("Error " + e));
        this.CLIENT.on("ready", () => console.log("Redis ready"));
    }
    setKey(key, value) {
        return new Promise((resolve, reject) => {
            this.CLIENT.set(key, value, (err, r) => {
                if (err) {
                    reject();
                    return;
                }
                resolve();
            });
        });
    }
    setHost(host) {
        if (!host)
            throw new Error("Não foi encontrado o host do Servidor de Cache Redis");
        this.HOST = host;
    }
    getKey(key) {
        return new Promise((resolve, reject) => {
            this.CLIENT.get(key, function (err, r) {
                if (r) {
                    resolve(r);
                    return;
                }
                if (err) {
                    reject(err);
                    return;
                }
            });
        });
    }
}
exports.Redis = Redis;
//# sourceMappingURL=redis.js.map