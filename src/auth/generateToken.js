import jwt from "jsonwebtoken";

const SECRET =
    process.env.JWT_SECRET || "defaultsecret";

export function generateToken(user) {
    return jwt.sign(

        {
            sub: user.id,
            role: user.role
        },

        SECRET,

        {
            expiresIn: "1h",
            issuer: "api-gateway"
        }
    );
}