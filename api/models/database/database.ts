export abstract class Database {
    abstract getKey(key:string)
    abstract setKey(key:string, value:string)
    abstract setHost(host:string)
}