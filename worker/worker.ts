import * as dotenv from "dotenv";
import * as config from 'config';

import { CurrencyExchangeFactory } from "./factories/CurrencyExchangeFactory/CurrencyExchangeFactory";
import { DatabaseFactory } from "./factories/DatabaseFactory/DatabaseFactory";
import { CurrencyExchange } from "./models/currencyExchange/currencyExchange";
import { Database } from "./models/database/database";
import { Currency } from "./models/currency/currency";


export class Worker {

    CURRENCY_CLIENT: CurrencyExchange;
    DATABASE_CLIENT: Database;
    
    constructor(provider:string, database:string ){
        
        this.createProvider(provider);
        this.createDatabase(database);
        this.init();

    }

    public createProvider(provider:string){

        let currencies = config.CurrencyExchanges[provider].currencies
        let lastro = config.CurrencyExchanges[provider].lastro;
        let currencyExchangeFactory = new CurrencyExchangeFactory()
        this.CURRENCY_CLIENT = currencyExchangeFactory.client(provider, currencies, lastro);

    }

    public createDatabase(database_name:string){

        const databaseFactory = new DatabaseFactory()
        this.DATABASE_CLIENT = databaseFactory.client(database_name)

    }

    public async init(){

        try {
            
            let currencies: Currency[] = await this.CURRENCY_CLIENT.getCurrency()

            for (const currency of currencies) {
                this.DATABASE_CLIENT.setKey(currency.key, currency.value)
            }

            let value = await this.DATABASE_CLIENT.getKey(currencies[0].key)
            console.log(currencies[0].key, value)

        } catch (error) {
            console.log(error)
        }

    }

}

let wk1 = new Worker("OpenExchange","Redis")
// let wk2 = new Worker("OutroServidorDeCotações")

