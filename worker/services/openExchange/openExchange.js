"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const config = require("config");
class OpenExchange {
    constructor(currencies, lastro) {
        if (!currencies || !lastro)
            throw new Error("Sem atributos necessários para criar OpenExchange client");
        if (!process.env.API_KEY_OEX)
            throw new Error("Variável de ambiente API_KEY_OEX não carregada");
        let api_key = process.env.API_KEY_OEX;
        this.setCredential(api_key);
        this.setCurrencies(currencies);
        this.setLastro(lastro);
    }
    setCredential(api_key) {
        this.API_KEY = api_key;
    }
    setCurrencies(currencies) {
        this.CURRENCIES = currencies.toString();
    }
    setLastro(lastro) {
        this.LASTRO = lastro;
    }
    getCurrency() {
        return new Promise((resolve, reject) => {
            let url = `${config.CurrencyExchanges.OpenExchange.url_base}?app_id=${this.API_KEY}&show_alternative=true&symbols=${this.CURRENCIES}&base=${this.LASTRO}`;
            request(url, (error, response, body) => {
                if (error) {
                    reject(error);
                    return;
                }
                let currencies = [];
                body = JSON.parse(body);
                if (body.rates) {
                    let rates = Object.keys(body.rates);
                    for (const key of rates) {
                        currencies.push({
                            key,
                            value: body.rates[key]
                        });
                    }
                    resolve(currencies);
                }
            });
        });
    }
}
exports.OpenExchange = OpenExchange;
//# sourceMappingURL=openExchange.js.map