import express from "express";
import dotenv from "dotenv";

import { generateToken }
from "../auth/generateToken.js";

import {
    registerService
} from "../discovery/registry.js";

import {
    startHeartbeat
} from "../discovery/heartbeat.js";

dotenv.config();

const app = express();

app.use(express.json());

const PORT = 8000;

const serviceName = "auth";

app.post("/auth/login", (req, res) => {

    const { username } = req.body;

    const user = {

        id: username,

        role:
            username === "admin"
                ? "admin"
                : "user"
    };

    const token =
        generateToken(user);

    res.json({ token });
});

app.get("/health", (req, res) => {
    res.json({ status: "healthy" });
});

app.listen(PORT, async () => {

    console.log(
        `Auth Service running on ${PORT}`
    );

    const instanceUrl =
        `http://localhost:${PORT}`;

    await registerService(
        serviceName,
        instanceUrl
    );

    startHeartbeat(
        serviceName,
        instanceUrl
    );
});