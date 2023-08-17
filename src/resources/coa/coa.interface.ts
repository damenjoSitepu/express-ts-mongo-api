import { Document } from "mongoose";

export default interface Coa extends Document {
    name: string;
    isActive: boolean;
}