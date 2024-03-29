import * as config from 'config';
import { Cache } from '../Cache/Cache';

export class CurrencyConverter {

    public CACHE : Cache;

    constructor(){
        this.CACHE = new Cache(config.database.name, config.cache.timeout_minute)
    }

    /**
     * @description convertCurrencyToUSD Converts the value of a currency to dollar
     * @param {string} currency_key currency you want to convert to dollars
     * @param {number} currency_value value of the currency you want to convert to dollars
     * @param {number} decimal_range value of decimal numbers after period
     * @returns {number} number value converted into dollars
     */
    async convertCurrencyToUSD(currency_key: string, currency_value:number, decimal_range: number = 3){
        try {
            
            let conversion: number

            let value = await this.CACHE.getValue(currency_key)       

            conversion = parseFloat((currency_value / value).toFixed(decimal_range))
            
            if(conversion == 0) conversion = parseFloat((currency_value / value).toFixed(10)) 

            if(isNaN(conversion)) throw new Error("conversion not exists")
            
            return conversion;
        } catch (error) {
            console.log(error)
            throw new Error("Erro ao converter CurrencyToUSD")
        }
    }
    
    /**
     * @description convertUSDToCurrency Converts the dollar value to another currency
     * @param {string} currency_key currency you want to convert
     * @param {string} dolar_value dollars value you want to convert
     * @param {number} decimal_range value of decimal numbers after period
     * @returns {number}
     */
    async convertUSDToCurrency(currency_key:string, dolar_value:number, decimal_range:number = 2){
        
        try {
            
            let conversion: number
            
            let currency_value = await this.CACHE.getValue(currency_key)
            
            conversion = parseFloat((dolar_value * currency_value).toFixed(decimal_range))
            
            if(conversion == 0) conversion = parseFloat((dolar_value * currency_value).toFixed(10)) 
            
            if(isNaN(conversion)) throw new Error("conversion not exists")
            
            return conversion;

        } catch (error) {
            console.log(error)
            throw new Error("Erro ao convertUSDTOCurrency")
        }
    }

    /**
     * @description convertfromToCurrency Converts the values from one currency to another
     * @param {string} from currency to convert to another currency
     * @param {string} to final currency to be converted in
     * @param {string} value value to be converted
     * @param {number} decimal_range value of decimal numbers after period
     * @returns {number} 
     */
    async convertfromToCurrency(from: string ,to: string ,value: number , decimal_range: number = 2){

        if(!from) throw new Error("from parameter not found");
        if(!to) throw new Error("to parameter not found");
        if(!this.isValidNumber(value)) throw new Error("value must be a number")

        let usd: number = await this.convertCurrencyToUSD(from,value, decimal_range)
        let result: number = await this.convertUSDToCurrency(to,usd, decimal_range)

        console.log("result::", result)
        return result
    }

    /**
     * @description isValidNumber Checks if number is valid and greater than 0
     * @param {string | integer} number
     * @returns {boolean}
     */
    isValidNumber(number:number): boolean{
        return !isNaN(number) && Number(number) > 0;
    }
}