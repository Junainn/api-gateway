import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

// Test GET
app.get("/test", (req, res) => {
    res.json({
        message: "GET request received at backend",
        query: req.query
    });
});

// Test POST
app.post("/test", (req, res) => {
    res.json({
        message: "POST request received at backend",
        body: req.body
    });
});

app.listen(PORT, () => {
    console.log(`Dummy Service is running on port ${PORT}`);
});


