import * as express from "express";

import { CurrencyConverterRoute } from "./routes/CurrencyConverterRoute";

export class Server {

  public app: express.Application;

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }


  constructor() {
    this.app = express();

    this.config();

    this.routes();
  }


  public config() {

    // catch 404 and forward to error handler
    this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
        err.status = 404;
        next(err);
    });

  }

  private routes() {
    let router: express.Router;
    router = express.Router();

    CurrencyConverterRoute.create(router);

    //use router middleware
    this.app.use(router);
  }

}
