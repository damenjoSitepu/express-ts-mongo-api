import mongoose, { CallbackWithoutResultAndOptionalError, Schema } from "mongoose";
import User from "@/resources/user/user.interface";
import bcrypt from "bcrypt";
import { UserModel } from "@/resources/user/user-mongo";

const UserSchema = new Schema<User,UserModel>({
    name: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true 
    },
    password: {
        type: String
    },
    role: {
        type: String,
        required: true 
    }
}, {
    timestamps: true
});

// Middleware before save
UserSchema.pre("save", async function (next: CallbackWithoutResultAndOptionalError) {
    if (!this.isModified(this.password)) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.isValidPassword = async function (password: string): Promise<Error | boolean> {
    return await bcrypt.compare(password, this.password);
};

const UserModel: UserModel = mongoose.model<User, UserModel>("users", UserSchema);
export default UserModel;