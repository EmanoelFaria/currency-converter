"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseFactory_1 = require("../../../worker/factories/DatabaseFactory/DatabaseFactory");
class Cache {
    constructor(database_name, cache_timeout_minutes) {
        const databaseFactory = new DatabaseFactory_1.DatabaseFactory();
        this.DATABASE_CLIENT = databaseFactory.client(database_name);
        this.refresh(cache_timeout_minutes);
    }
    getValue(key) {
        return __awaiter(this, void 0, void 0, function* () {
            let cached_value = this.LOCAL_STORAGE[key];
            if (cached_value)
                return cached_value;
            let value = yield this.DATABASE_CLIENT.getKey(key);
            this.LOCAL_STORAGE[key] = value;
        });
    }
    refresh(timeout_minute) {
        return __awaiter(this, void 0, void 0, function* () {
            let storage_keys = Object.keys(this.LOCAL_STORAGE);
            for (const key of storage_keys) {
                try {
                    let value = yield this.DATABASE_CLIENT.getKey(key);
                    this.LOCAL_STORAGE[key] = value;
                }
                catch (error) {
                    console.log(error);
                    continue;
                }
            }
            setTimeout(this.refresh, timeout_minute);
        });
    }
}
exports.Cache = Cache;
//# sourceMappingURL=Cache.js.map