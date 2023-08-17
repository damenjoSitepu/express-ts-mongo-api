import CoaModel from "@/resources/coa/coa.model";
import Coa from "@/resources/coa/coa.interface";

class CoaService {
    private coa = CoaModel;
    /**
     * Create a new chart of account
     */
    public async create(name: string, isActive: boolean): Promise<Coa> {
        try {
            const coa = await this.coa.create({ name, isActive });
            return coa;
        } catch (e: any) {
            throw new Error("Unable to create chart of account!");
        }
    }
}
export default CoaService;
