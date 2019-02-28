import { OpenExchange } from '../../services/openExchange/openExchange';
import { CurrencyExchange } from '../../models/currencyExchange/currencyExchange';

export class CurrencyExchangeFactory {

    public client(provider: string, currencies: string[], lastro: string) : CurrencyExchange{
        
        if(!provider) throw new Error("É necessário um provider e suas configurações")

        if(provider == "OpenExchange") {

            if(!currencies) throw new Error("Credencial inválida")
            if(!lastro) throw new Error("Credencial inválida")
            const openExchangeClient = new OpenExchange(currencies, lastro)
            return openExchangeClient;
            
        }

        if(provider == "outroProvider") {
            //Return outro providerclient
        }
        
    }
    
}