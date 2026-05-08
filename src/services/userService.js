import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const USER_PORT = process.env.USER_PORT || 4000;

app.use((req, res, next) => {
    console.log(JSON.stringify({
        service: "user-service",
        requestId: req.headers['x-request-id'],
        path: req.path
    }));
    next();
});

app.get("/health", (req, res) => {

    res.json({
        status: "healthy"
    });
});

app.get("/users", (req, res) => {
    res.json({ service: "User Service", data: ["user1", "user2"],PORT : USER_PORT });
});

app.get("/users/:id", (req, res) => {
    res.json({ service: "User Service", userId: req.params.id });
});

app.listen(USER_PORT, () => {
    console.log(`User Service running on port ${USER_PORT}`);
});