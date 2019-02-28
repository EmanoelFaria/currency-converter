"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openExchange_1 = require("../../services/openExchange/openExchange");
class CurrencyExchangeFactory {
    client(provider, currencies, lastro) {
        if (!provider)
            throw new Error("É necessário um provider e suas configurações");
        if (provider == "OpenExchange") {
            if (!currencies)
                throw new Error("Credencial inválida");
            if (!lastro)
                throw new Error("Credencial inválida");
            const openExchangeClient = new openExchange_1.OpenExchange(currencies, lastro);
            return openExchangeClient;
        }
        if (provider == "outroProvider") {
        }
    }
}
exports.CurrencyExchangeFactory = CurrencyExchangeFactory;
//# sourceMappingURL=CurrencyExchangeFactory.js.map