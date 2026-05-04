const requestCounts = {};

export function rateLimit(req, res, next) {
    const ip = req.ip;

    if (!requestCounts[ip]) {
        requestCounts[ip] = 0;
    }
    console.log(req.user);
    requestCounts[ip]++;

    if (requestCounts[ip] > 5) {
        return res.status(429).json({ error: "Too many requests" });
    }

    next();
}