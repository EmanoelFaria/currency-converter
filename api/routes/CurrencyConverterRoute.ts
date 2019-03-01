import * as config from 'config';
import { NextFunction, Request, Response, Router } from "express";

import { CurrencyConverter } from '../services/CurrencyConverter/CurrencyConverter';
const currencyConverter = new CurrencyConverter()

export class CurrencyConverterRoute {

    public static create(router: Router) {
        
        router.get("/", async (req: Request, res: Response, next: NextFunction) => {

            if(!this.hasConversionFields(req.query)) {
                let fields = Object.keys(req.query).toString()
                res.status(400).send({error:`Parameters "from", "to" and "amount" are required. Received ${fields}`})
                return
            }

            if(!this.isValidNumber(req.query.amount)) {
                res.status(400).send({error:`"amount" parameter must be a valid number greater than 0`})
                return
            }

            if(!this.isValidCurrency(req.query.from, req.query.to)){
                let availableCurrencies = config.currencies.toString()
                res.status(400).send({error:`The currencies you want to convert are not available. Try one of these ${availableCurrencies}`})
                return
            }

            let from = req.query.from.toUpperCase()
            let to = req.query.to.toUpperCase()
            let amount = req.query.amount
            let currencies = config.currencies
            
            let result = await currencyConverter.convertfromToCurrency(from,to,amount,currencies)

            if(!result) {
                res.status(500).send({error:"There was an error while trying to convert. Try again"})
                return
            }
            
            let response = {
                from,
                to,
                amount,
                result
            }

            res.status(200).send(response)

        });
        
    }

    /**
     * @description hasConversionFields Checks whether the object has the attributes "from", "to" and "amount"
     * @param {*} body 
     * @returns {boolean}
     */
    static hasConversionFields(query){
        return ['from','to','amount'].every(f => Object.keys(query).includes(f))
    }

    /**
     * @description isValidNumber Checks if number is valid and greater than 0
     * @param {string | integer} number
     * @returns {boolean}
     */
    static isValidNumber(number){
        return !isNaN(number) && Number(number) > 0;
    }

    /**
     * @description isValidCurrency Checks if the desired currency exists in our cache / is valid to be converted
     * @param {Object} body 
     * @returns {boolean}
     */
    static isValidCurrency(from,to){

        if(!from || !to) return false

        let values = config.currencies;
        from = from.toUpperCase();
        to = to.toUpperCase();

        if(!values.includes(from) || !values.includes(to)) return false;

        return true;
    }
    

}