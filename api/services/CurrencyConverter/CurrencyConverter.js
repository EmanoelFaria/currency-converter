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
const Cache_1 = require("../Cache/Cache");
class CurrencyConverter {
    constructor() {
        this.LOCAL_STORAGE = new Cache_1.Cache(config.database.name, config.cache.timeout_minute);
    }
    static convertCurrencyToUSD(currency_key, currency_value, decimal_range = 3) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let conversion;
                let value = yield this.LOCAL_STORAGE[currency_key];
                conversion = parseFloat((currency_value / value).toFixed(decimal_range));
                if (!conversion)
                    throw new Error("currency_key not exists");
                return conversion;
            }
            catch (error) {
                console.log(error);
                throw new Error("Erro ao converter CurrencyToUSD");
            }
        });
    }
    static convertUSDToCurrency(currency_key, dolar_value, decimal_range = 3) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let conversion;
                let currency_value = yield this.LOCAL_STORAGE[currency_key];
                conversion = parseFloat((dolar_value * currency_value).toFixed(decimal_range));
                if (!conversion)
                    throw new Error("currency_key not exists");
                return conversion;
            }
            catch (error) {
                console.log(error);
                throw new Error("Erro ao convertUSDTOCurrency");
            }
        });
    }
    static convertfromToCurrency(from, to, value, decimal_range = 3) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!from)
                throw new Error("from parameter not found");
            if (!to)
                throw new Error("to parameter not found");
            if (!this.isValidNumber(value))
                throw new Error("value must be a number");
            let usd = yield this.convertCurrencyToUSD(from, value, decimal_range);
            let result = yield this.convertUSDToCurrency(to, usd, decimal_range);
            return result;
        });
    }
    static isValidNumber(number) {
        return !isNaN(number) && Number(number) > 0;
    }
}
exports.CurrencyConverter = CurrencyConverter;
//# sourceMappingURL=CurrencyConverter.js.map