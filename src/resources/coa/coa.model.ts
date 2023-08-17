import mongoose, { Schema } from "mongoose";
import Coa from "@/resources/coa/coa.interface";
import { CoaModel } from "@/resources/coa/coa-mongo";

const CoaSchema = new Schema<Coa, CoaModel>({
    name: {
        type: String,
        required: true 
    }, 
    isActive: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
});

const CoaModel: CoaModel = mongoose.model<Coa, CoaModel>("chart_of_account", CoaSchema);
export default CoaModel;
