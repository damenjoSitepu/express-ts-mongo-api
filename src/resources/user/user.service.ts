import UserModel from "@/resources/user/user.model";
import TokenService from "@/utils/token.service";

class UserService {
    private user: UserModel = UserModel;

    public async register(
        name: string,
        email: string,
        password: string,
        role: string = "user"
    ): Promise<string | Error>
    {
        try {
            const user = await this.user.create({ name, email, password, role });
            const accessToken = (new TokenService()).createToken(user);
            return accessToken;
        } catch (e: any) {
            throw new Error(e.message);
        }
    }

    public async login(
        email: string,
        password: string
    ): Promise<string | Error> {
        try {
            const user = await this.user.findOne({ email });
            // Check user email
            if (!user) {
                throw new Error("Email or password are invalid, please try again!");
            }
            // Check user password
            if (!await user.isValidPassword(password)) {
                throw new Error("Email or password are invalid, please try again!");
            }

            const accessToken = (new TokenService()).createToken(user);
            return accessToken;
        } catch (e: any) {
            throw new Error(e.message);
        }
    }
}

export default UserService;