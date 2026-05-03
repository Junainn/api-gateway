import express from 'express';

const app = express();
app.use(express.json());

const PORT = 5000;

app.get("/products", (req, res) => {
    res.json({ service: "Product Service", data: ["product1", "product2"] });
});

app.get("/products/:id", (req, res) => {
    res.json({ service: "Product Service", productId: req.params.id });
});

app.listen(PORT, () => {
    console.log(`Product Service running on port ${PORT}`);
});