import express from 'express';

const app = express();
app.use(express.json());

const PORT = 4000;

app.get("/users", (req, res) => {
    res.json({ service: "User Service", data: ["user1", "user2"] });
});

app.get("/users/:id", (req, res) => {
    res.json({ service: "User Service", userId: req.params.id });
});

app.listen(PORT, () => {
    console.log(`User Service running on port ${PORT}`);
});