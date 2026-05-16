import { verifyToken }
    from "../auth/verifyToken.js";


const publicRoutes = ["/auth/login"];

export function auth(
    req,
    res,
    next
) {

    // SKIP JWT FOR PUBLIC ROUTES
    if (
        publicRoutes.includes(req.path)
    ) {
        return next();
    }

    const authHeader =
        req.headers.authorization;

    if (!authHeader) {

        return res.status(401).json({
            error: "Missing token"
        });
    }

    const token =
        authHeader.split(" ")[1];

    try {

        const decoded =
            verifyToken(token);

        req.user = decoded;

        next();

    } catch (error) {
        
        return res.status(401).json({
            error: "Invalid token"
        });
    }
}