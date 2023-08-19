import { Model } from "mongoose";
import User from "@/resources/user/user.interface";

export interface UserModel extends Model<User> {

}
