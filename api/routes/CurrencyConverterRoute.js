"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("config");
const CurrencyConverter_1 = require("../services/CurrencyConverter/CurrencyConverter");
class CurrencyConverterRoute {
    static create(router) {
        router.get("/", (req, res, next) => {
            if (!this.hasConversionFields(req.query)) {
                let fields = Object.keys(req.query).toString();
                res.status(400).send({ error: `Parameters "from", "to" and "amount" are required. Received ${fields}` });
                return;
            }
            if (!this.isValidNumber(req.query.amount)) {
                res.status(400).send({ error: `"amount" parameter must be a valid number greater than 0` });
                return;
            }
            if (!this.isValidCurrency(req.query.from, req.query.to)) {
                let availableCurrencies = config.currencies.toString();
                res.status(400).send({ error: `The currencies you want to convert are not available. Try one of these ${availableCurrencies}` });
                return;
            }
            let from = req.query.from.toUpperCase();
            let to = req.query.to.toUpperCase();
            let amount = req.query.amount;
            let currencies = config.currencies;
            let result = CurrencyConverter_1.CurrencyConverter.convertfromToCurrency(from, to, amount, currencies);
            if (!result) {
                res.status(500).send({ error: "There was an error while trying to convert. Try again" });
                return;
            }
            let response = {
                from,
                to,
                amount,
                result
            };
            res.status(200).send(response);
        });
    }
    static hasConversionFields(query) {
        return ['from', 'to', 'amount'].every(f => Object.keys(query).includes(f));
    }
    static isValidNumber(number) {
        return !isNaN(number) && Number(number) > 0;
    }
    static isValidCurrency(from, to) {
        if (!from || !to)
            return false;
        let values = config.currencies;
        from = from.toUpperCase();
        to = to.toUpperCase();
        if (!values.includes(from) || !values.includes(to))
            return false;
        return true;
    }
}
exports.CurrencyConverterRoute = CurrencyConverterRoute;
//# sourceMappingURL=CurrencyConverterRoute.js.map