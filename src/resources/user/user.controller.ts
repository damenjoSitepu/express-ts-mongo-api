import Controller from "@/utils/interfaces/controller.interface";
import { Router, Response, Request, NextFunction } from "express";
import UserService from "@/resources/user/user.service";
import validationMiddleware from "@/middleware/validation.middleware";
import { register, login } from "@/resources/user/user.validation";
import HttpException from "@/utils/exceptions/http.exception";
import authenticated from "@/middleware/authenticated.middleware";

class UserController implements Controller {
    public path: string = "/user";
    public router: Router = Router();
    private UserService: UserService = new UserService();

    private register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { name, email, password, role } = req.body;
            const accessToken = await this.UserService.register(name, email, password, role);
            res.status(201).json({ accessToken });
        } catch (e: any) {
            next(new HttpException(400, e.message));
        }
    }

    private login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email, password } = req.body;
            const accessToken = await this.UserService.login(email, password);
            res.status(200).json({ accessToken });
        } catch (e: any) {
            next(new HttpException(400, e.message));
        }
    }

    private getUser = async(
        req: Request,
        res: Response,
        next: NextFunction 
    ): Promise<Response | void> => {
        if (!req.user) {
            return next(new HttpException(404, "No user login!"));
        }
        res.status(200).json({
            user: req.user
        });
    }

    public constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            `${this.path}/register`,
            validationMiddleware(register),
            this.register
        );
        this.router.post(
            `${this.path}/login`,
            validationMiddleware(login),
            this.login
        );
        this.router.get(
            `${this.path}`,
            authenticated,
            this.getUser
        );
    }
}

export default UserController;