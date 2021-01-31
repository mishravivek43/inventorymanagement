import { User } from './entity/User';
import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";
import * as session from "express-session";
import * as redis from "redis";
import * as cors from 'cors';

const redisClient = redis.createClient();
const redisStore = require('connect-redis')(session);
const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: true,
  preflightContinue: true,
};
declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
    admin:{ [key: string]: any };
  }
}
const app = express();
app.use(session({
        secret: 'ThisIsHowYouUseRedisSessionStorage',
        name: '_redisPractice',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // Note that the cookie-parser module is no longer needed
        store: new redisStore({ host: 'localhost', port: 6379, client: redisClient, ttl: 15*24*3600*1000 }),
    }));
    app.use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        // res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });
    app.use(cors(options));
    app.options('*', cors(options));
    app.use(bodyParser.json())
createConnection().then(async connection => {

    // create express app

    // Setting Session Variable and Session Timeout

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    // setup express app here
    // ...

    // start express server
    app.listen(3000);

   // insert new users for test
    await connection.manager.save(connection.manager.create(User, {
        firstName: "Vivek",
        lastName: "Mishra",
        username: "vivekmishra",
        password: "password"
    }));
    await connection.manager.save(connection.manager.create(User, {
        firstName: "Demo",
        lastName: "Demo",
        username: "Demo",
        password: "Demo123"
    }));

    console.log("Express server has started on port 3000. Open http://localhost:3000/products to see results");

}).catch(error => console.log(error));
