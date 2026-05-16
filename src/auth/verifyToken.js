import jwt from "jsonwebtoken";

const SECRET =
    process.env.JWT_SECRET || "defaultsecret";

export function verifyToken(token) {

    return jwt.verify(
        token,
        SECRET
    );
}