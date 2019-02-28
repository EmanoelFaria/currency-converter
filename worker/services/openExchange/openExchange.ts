import * as request from 'request';
import * as config from 'config';
import { Currency } from '../../models/currency/currency';
import { CurrencyExchange } from '../../models/currencyExchange/currencyExchange';

class OpenExchange implements CurrencyExchange {

    URL: string;
    API_KEY: string;
    CURRENCIES: string;
    LASTRO: string

    constructor(currencies?: string[], lastro?: string){

        if(!currencies || !lastro) throw new Error("Sem atributos necessários para criar OpenExchange client")
        if(!process.env.API_KEY_OEX) throw new Error("Variável de ambiente API_KEY_OEX não carregada");

        let api_key = process.env.API_KEY_OEX;
        this.setCredential(api_key)
        this.setCurrencies(currencies);
        this.setLastro(lastro);
      
    }

    setCredential(api_key: string){
        this.API_KEY = api_key;
    }

    setCurrencies(currencies: string[]){
        this.CURRENCIES = currencies.toString();
    }   

    setLastro(lastro: string){
        this.LASTRO = lastro
    }

    /**
     * @description getCurrency is responsible for directly searching the Open Exchanges Rates API for the quotes entered in the application configuration files.
     * @returns {Currency[]}
     */
    getCurrency(){
        return new Promise((resolve,reject)=>{
        
            let url = `${config.CurrencyExchanges.OpenExchange.url_base}?app_id=${this.API_KEY}&show_alternative=true&symbols=${this.CURRENCIES}&base=${this.LASTRO}`

            request(url, (error, response, body) => {        
                if(error) {
                    reject(error)
                    return 
                }

                let currencies : Currency[] = []
                
                body = JSON.parse(body)

                if(body.rates){
                    let rates = Object.keys(body.rates)

                    for (const key of rates) {
                        currencies.push({
                            key,
                            value: body.rates[key]
                        })
                    }

                    resolve(currencies)
                }

            });
        })
    }

}

export { OpenExchange }