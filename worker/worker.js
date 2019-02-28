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
const config = require("config");
const CurrencyExchangeFactory_1 = require("./factories/CurrencyExchangeFactory/CurrencyExchangeFactory");
const DatabaseFactory_1 = require("./factories/DatabaseFactory/DatabaseFactory");
class Worker {
    constructor(provider, database) {
        this.createProvider(provider);
        this.createDatabase(database);
        this.init();
    }
    createProvider(provider) {
        let currencies = config.CurrencyExchanges[provider].currencies;
        let lastro = config.CurrencyExchanges[provider].lastro;
        let currencyExchangeFactory = new CurrencyExchangeFactory_1.CurrencyExchangeFactory();
        this.CURRENCY_CLIENT = currencyExchangeFactory.client(provider, currencies, lastro);
    }
    createDatabase(database_name) {
        const databaseFactory = new DatabaseFactory_1.DatabaseFactory();
        this.DATABASE_CLIENT = databaseFactory.client(database_name);
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let currencies = yield this.CURRENCY_CLIENT.getCurrency();
                for (const currency of currencies) {
                    this.DATABASE_CLIENT.setKey(currency.key, currency.value);
                }
                let value = yield this.DATABASE_CLIENT.getKey(currencies[0].key);
                console.log(currencies[0].key, value);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.Worker = Worker;
let wk1 = new Worker("OpenExchange", "Redis");
//# sourceMappingURL=worker.js.map