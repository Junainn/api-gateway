export function auth(req, res, next) {
    const apiKey = req.headers['x-api-key'];

    if(!apiKey){
        return res.status(401).json({ error: "API key missing" });
    }

    req.user = { apiKey }; // In real scenarios, you'd verify the API key and fetch user details

    next();
}