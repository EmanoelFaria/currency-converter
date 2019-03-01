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
const CurrencyConverter_1 = require("../services/CurrencyConverter/CurrencyConverter");
const currencyConverter = new CurrencyConverter_1.CurrencyConverter();
class CurrencyConverterRoute {
    static create(router) {
        router.get("/", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
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
            let result = yield currencyConverter.convertfromToCurrency(from, to, amount, currencies);
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
        }));
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