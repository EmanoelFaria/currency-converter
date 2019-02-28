
export abstract class CurrencyExchange {
    
    abstract setLastro(lastro: string)
    abstract setCurrencies(currencies: string[])
    abstract setCredential(credential: any)
    abstract getCurrency()
}