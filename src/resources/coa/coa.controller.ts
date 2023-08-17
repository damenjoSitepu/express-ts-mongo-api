import { Router, Request, Response, NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import validationMiddleware from "@/middleware/validation.middleware"
import validate from "@/resources/coa/coa.validation";
import CoaService from "@/resources/coa/coa.service";

class CoaController implements Controller {
    public path: string = "/chart-of-accounts";
    public router: Router = Router();
    private CoaService = new CoaService();

    public constructor() {
        this.initializeRoutes();
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction 
    ): Promise<Response | void> => {
        try {
            const { name, isActive } = req.body;
            const chartOfAccount = await this.CoaService.create(name, isActive);
            res.status(201).json({ chartOfAccount });
        } catch (e: any) {
            next(new HttpException(400, "Cannot creating chart of account!"));
        }
    }

    private initializeRoutes(): void {
        this.router.post(
            `${this.path}/create`,
            validationMiddleware(validate.create),
            this.create
        );
    }
}

export default CoaController;