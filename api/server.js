"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const CurrencyConverterRoute_1 = require("./routes/CurrencyConverterRoute");
class Server {
    static bootstrap() {
        return new Server();
    }
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    config() {
        this.app.use(function (err, req, res, next) {
            err.status = 404;
            next(err);
        });
    }
    routes() {
        let router;
        router = express.Router();
        CurrencyConverterRoute_1.CurrencyConverterRoute.create(router);
        this.app.use(router);
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map