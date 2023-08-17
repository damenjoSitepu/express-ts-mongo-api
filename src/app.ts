// Will be the setup file for the applications
import express, { Application, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import Controller from "@/utils/interfaces/controller.interface";
import ErrorMiddleware from "@/middleware/error.middleware";
import helmet from "helmet";

class App {
    public express: Application;
    public port: number;

    constructor(controller: Controller[], port: number) {
        this.express = express();
        this.port = port;
        this.initializeDatabaseConnection();
        this.initializeMiddleware();
        this.initializeControllers(controller);
        this.initializeErrorHandling();
    }

    private initializeMiddleware(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan("dev"));
        this.express.use(express.json());
        this.express.use(express.urlencoded({
            extended: false,
            limit: 10000
        }));
        this.express.use(compression());
    }

    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use("/secure-api", controller.router);
        });
    }

    private initializeErrorHandling(): void {
        this.express.use(ErrorMiddleware);
    }

    private initializeDatabaseConnection(): void {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
        mongoose.connect(`mongodb://localhost/account`);
    }

    public listen(): void {
        this.express.get("/", (req: Request, res: Response, next: NextFunction) => {
            return res.json({
                error: false,
                message: "Successfully accessing our main route!"
            });
        });
        this.express.listen(this.port, () => {
            console.log('This app listening on port ' + this.port);
        });
    }
}

export default App;