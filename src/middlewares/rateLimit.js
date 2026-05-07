import axios from 'axios';

export async function rateLimit(req, res, next) {
    try {
        const apiKey = req.headers['x-api-key'];
        const resource = "/" + req.originalUrl.split("/")[1];

        const response = await axios.post(
            "http://localhost:7000/check",
            {
                apiKey,
                identity: apiKey,
                resource
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-request-id": req.requestId
                }
            }
        );

        
        if (response.data.allowed) {
            
            return next();
        }

       
        return res.status(429).json({ error: "Rate limit exceeded" });

    } catch (error) {

        
        if (error.response) {
            // RLaaS responded (like 429)
            return res.status(error.response.status).json(error.response.data);
        }

        
        console.error("Rate limiter service down:", error.message);
        return next(); // fail-open
    }
}