// Will be the entry points of the application
import "dotenv/config";
import "module-alias/register";
import App from "./app";
import validateEnv from "@/utils/validateEnv";
import CoaController from "@/resources/coa/coa.controller";
import UserController from "@/resources/user/user.controller";

validateEnv();

const app = new App([
    new CoaController(),
    new UserController()
], Number(process.env.PORT));
app.listen();
