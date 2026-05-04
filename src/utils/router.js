import axios from 'axios';

// Routing table
const ROUTES = {
    "/users": "http://localhost:4000",
    "/products": "http://localhost:5000"
};

function getTargetService(url) {
    return Object.keys(ROUTES).find(route =>
        url === route || url.startsWith(route + "/")
    );
}

export async function router(req, res) {
    try {
        const matchedRoute = getTargetService(req.originalUrl);

        if (!matchedRoute) {
            return res.status(404).json({ error: "No route found" });
        }

        const target = ROUTES[matchedRoute];

        const response = await axios({
            method: req.method,
            url: `${target}${req.originalUrl}`,
            headers: req.headers,
            data: req.body
        });

        res.status(response.status).send(response.data);

    } catch (error) {
        if (error.response) {
            res.status(error.response.status).send(error.response.data);
        } else {
            res.status(500).json({ error: "Gateway error" });
        }
    }
}