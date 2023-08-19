import Token from "@/utils/interfaces/token.interface";
import User from "@/resources/user/user.interface";
import jwt from "jsonwebtoken";

class TokenService {
    /**
     * Define JWT Secret Environment
     */
    private jwtSecret: jwt.Secret = (process.env.JWT_SECRET || "") as jwt.Secret;

    public createToken = (user: User): string => {
        return jwt.sign({ id: user._id }, this.jwtSecret, {
            expiresIn: "1d"
        });
    };

    public verifyToken = async (token: string): Promise<jwt.VerifyErrors | Token> => {
        return new Promise((resolve, reject) => {
            jwt.verify(
                token,
                this.jwtSecret,
                (err, payload) => {
                    if (err) return reject(err);
                    resolve(payload as Token);
                }
            );
        });
    };
};

export default TokenService;