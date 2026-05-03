import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT;

const ROUTES = {
    "/users": "http://localhost:4000",
    "/products": "http://localhost:5000"
}

function getTargetService(url) {
    return Object.keys(ROUTES).find(route => url.startsWith(route));
}


app.use(async (req, res) => {
    try {
        const matchedRoute = getTargetService(req.originalUrl);
        if (!matchedRoute) {
            return res.status(404).json({ error: "Route not found" });
        }

        const TARGET_URL = ROUTES[matchedRoute];

        const response = await axios({
            method: req.method,
            url: `${TARGET_URL}${req.originalUrl}`,
            headers: req.headers,
            data: req.body
        });

        res.status(response.status).send(response.data);

    } catch (error) {
        if (error.response) {
            // Backend responded with error
            res.status(error.response.status).send(error.response.data);
        } else {
            // Network / server error
            res.status(500).json({ error: "Gateway error" });
        }
    }
});

app.listen(PORT,()=>{
    
    console.log(`API Gateway is running on port ${PORT}`);
})