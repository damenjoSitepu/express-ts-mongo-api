// Will be the entry points of the application
import "dotenv/config";
import "module-alias/register";
import App from "./app";
import validateEnv from "@/utils/validateEnv";
import CoaController from "@/resources/coa/coa.controller";

validateEnv();

const app = new App([
    new CoaController()
], Number(process.env.PORT));
app.listen();
