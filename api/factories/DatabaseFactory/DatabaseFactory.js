"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("../../services/redis/redis");
class DatabaseFactory {
    client(database_name) {
        if (!database_name)
            throw new Error("Banco de dados não encontrado");
        if (database_name == "Redis") {
            const redisClient = new redis_1.Redis();
            return redisClient;
        }
        if (database_name == "Outro banco de dados") {
        }
    }
}
exports.DatabaseFactory = DatabaseFactory;
//# sourceMappingURL=DatabaseFactory.js.map