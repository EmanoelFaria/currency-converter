"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Converter {
    static convertCurrencyToUSD(currency_key, currency_value, currencies, decimal_range = 3) {
        let conversion;
        for (const currency of currencies) {
            if (currency.key == currency_key) {
                conversion = parseFloat((currency_value / currency.value).toFixed(decimal_range));
                break;
            }
        }
        if (!conversion)
            throw new Error("currency_key not exists");
        return conversion;
    }
    static convertUSDToCurrency(currency_key, dolar_value, currencies, decimal_range = 3) {
        let conversion;
        for (const currency of currencies) {
            if (currency.key == currency_key) {
                conversion = parseFloat((dolar_value * currency.value).toFixed(decimal_range));
                break;
            }
        }
        if (!conversion)
            throw new Error("currency_key not exists");
        return conversion;
    }
    static convertfromToCurrency(from, to, value, currencies, decimal_range = 3) {
        if (!from)
            throw new Error("from parameter not found");
        if (!to)
            throw new Error("to parameter not found");
        if (!currencies)
            throw new Error("currencies parameter not found");
        if (!this.isValidNumber(value))
            throw new Error("value must be a number");
        let usd = this.convertCurrencyToUSD(from, value, currencies, decimal_range);
        let result = this.convertUSDToCurrency(to, usd, currencies, decimal_range);
        return result;
    }
    static isValidNumber(number) {
        return !isNaN(number) && Number(number) > 0;
    }
}
exports.Converter = Converter;
//# sourceMappingURL=converter.js.map