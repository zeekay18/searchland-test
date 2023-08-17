import express, { Express, Request, Response } from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import "reflect-metadata";
import { dataSource } from "./database";
import { createTRPCContext } from "./trpc";
import { appRouter } from "./trpc/router";
import pinoLogger from "pino-http";
import cors from "cors";
import { ORIGIN_URL } from "./lib/constants";

const port = 3001;

dataSource
  .initialize()
  .then(() => {
    console.log("database connection established");

    const app = express();
    app.use(pinoLogger());

    app.use(
      cors({
        origin: ORIGIN_URL.split(","),
      })
    );

    app.use(
      "/rpc",
      trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext: createTRPCContext,
      })
    );

    app.get("/", (req: Request, res: Response) => {
      res.send("Express + TypeScript Server");
    });

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((error) => console.log("database connection error:", error));
