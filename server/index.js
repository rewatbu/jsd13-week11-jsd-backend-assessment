import express from "express";
import { products } from "./data/products.js";

const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  return res.status(500).json({
    error: "Something went wrong on the server...",
    message: err.message,
  });
});

// Route test
app.get("/", (req, res, next) => {
  try {
    res.send("Hello from Express!");
  } catch(err) {
    next(err);
  }
});

// Get all products
app.get("/products", async (req, res, next) => {
    try {
      res.status(200).json(products);
    } catch(err) {
        next(err);
    }
});

// Get product by id
app.get("/products/:id", (req, res, next) => {
    try {
    const id = Number(req.params.id);
    
    const product = products.find((product) => product.id === id);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
    } catch(err) {
        next(err);
    }
})

// Create/add new product
app.post("/products", async (req, res) => {
    try {
    const { productName, price } = req.body;

    if (!productName || !price) {
        return res.status(400).json({ error: "id, productName, and price are require!" });
    }

    const highestId = products.reduce((max, product) => Math.max(max, Number(product.id)), 0 );
    const nextId = highestId + 1;

    const newProduct = {
        id: nextId,
        productName: productName,
        price: price,
    };

    products.push(newProduct);

    return res.status(201).json(newProduct);
    } catch(err) {
        next(err);
    }
});




// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
