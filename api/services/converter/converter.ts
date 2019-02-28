import { Currency } from '../../interfaces/currency/currency';

class Converter {

    /**
     * @description convertCurrencyToUSD Converts the value of a currency to dollar
     * @param {string} currency_key currency you want to convert to dollars
     * @param {number} currency_value value of the currency you want to convert to dollars
     * @param {Currency[]} currencies array of currencies available
     * @param {number} decimal_range value of decimal numbers after period
     * @returns {number} number value converted into dollars
     */
    static convertCurrencyToUSD(currency_key: string, currency_value:number, currencies: Currency[], decimal_range: number = 3): number{

        let conversion: number

        for (const currency of currencies) {
            if(currency.key == currency_key) {
                conversion = parseFloat((currency_value / currency.value).toFixed(decimal_range))
                break;
            }
        }   
        
        if(!conversion) throw new Error("currency_key not exists")
        
        return conversion;
    }

    /**
     * @description convertUSDToCurrency Converts the dollar value to another currency
     * @param {string} currency_key currency you want to convert
     * @param {string} dolar_value dollars value you want to convert
     * @param {Currency[]} currencies array of currencies available
     * @param {number} decimal_range value of decimal numbers after period
     * @returns {number}
     */
    static convertUSDToCurrency(currency_key:string, dolar_value:number, currencies:Currency[], decimal_range:number = 3): number{

        let conversion: number

        for (const currency of currencies) {
            if(currency.key == currency_key) {
                conversion = parseFloat((dolar_value * currency.value).toFixed(decimal_range))
                break;
            }
        }   
        
        if(!conversion) throw new Error("currency_key not exists")
        
        return conversion;
    }

    /**
     * @description convertfromToCurrency Converts the values from one currency to another
     * @param {string} from currency to convert to another currency
     * @param {string} to final currency to be converted in
     * @param {string} value value to be converted
     * @param {Currency[]} currencies array of currencies available
     * @param {number} decimal_range value of decimal numbers after period
     * @returns {number} 
     */
    static convertfromToCurrency(from: string ,to: string ,value: number ,currencies: Currency[], decimal_range: number = 3): number{

        if(!from) throw new Error("from parameter not found");
        if(!to) throw new Error("to parameter not found");
        if(!currencies) throw new Error("currencies parameter not found");
        if(!this.isValidNumber(value)) throw new Error("value must be a number")

        let usd: number = this.convertCurrencyToUSD(from,value,currencies, decimal_range)
        let result: number = this.convertUSDToCurrency(to,usd,currencies, decimal_range)
        return result
    }

    /**
     * @description isValidNumber Checks if number is valid and greater than 0
     * @param {string | integer} number
     * @returns {boolean}
     */
    static isValidNumber(number:number): boolean{
        return !isNaN(number) && Number(number) > 0;
    }
}

export { Converter }