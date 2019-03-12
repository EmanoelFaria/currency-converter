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
    
    /**
     * @param {string} provider Name of provider that will be used to get currencies
     * @param {string} database Name of database that will be used to store currencies

     */
    constructor(provider:string, database:string ){
        
        this.createProvider(provider);
        this.createDatabase(database);
        this.init();

    }

    /**
     * @description Creates quotations provider
     * @param {string} provider Name of the quote provider that will be created
     */
    public createProvider(provider:string){

        let currencies = config.CurrencyExchanges[provider].currencies
        let lastro = config.CurrencyExchanges[provider].lastro;
        let currencyExchangeFactory = new CurrencyExchangeFactory()
        this.CURRENCY_CLIENT = currencyExchangeFactory.client(provider, currencies, lastro);

    }

    /**
     * @description Creates a database that will be used by the worker
     * @param {string} database_name Name of the database that will be used
     */
    public createDatabase(database_name:string){

        const databaseFactory = new DatabaseFactory()
        this.DATABASE_CLIENT = databaseFactory.client(database_name)

    }

    /**
     * @description init executes the worker's routine based on the configured time.
     * @param {number} error_count number of accumulated errors
     */
    public async init(error_count?){

        try {
            
            let currencies: Currency[] = await this.CURRENCY_CLIENT.getCurrency()

            for (const currency of currencies) {
                this.DATABASE_CLIENT.setKey(currency.key, currency.value)
            }

            setTimeout(() => this.init(), config.worker.time_to_refresh_currencies_in_minutes * 60 * 1000);
            
        } catch (error) {

            if(error_count && error_count >= config.worker.max_error_count_to_stop) {
                console.log(error)
                console.log("Muitos erros, o worker será finalizado")
                return
            }

            error_count += 1;
            setTimeout(() => this.init(error_count), config.worker.time_to_refresh_currencies_in_minutes * 60 * 1000);
        }

    }

}

//TODO: Colocar exemplo melhor de codigo de criação de worker
//TODO: Criar uma classe init para nao iniciar o codigo aqui na classe do worker
//TODO: Remover codigos nao utilizados nos arquivos de configuração do worker

new Worker("OpenExchange","Redis")
// let workerOpenExchangeWithRedis = new Worker("OpenExchange","Redis")
// let workerWorldExchangeWithMysql = new Worker("WorldExchange","Mysql")

