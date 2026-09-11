import express from "express";
import cors from "cors";
import { products } from "./data/products.js";

const app = express();

const PORT = 3000;

// Middleware
app.use(cors());
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
    const id = req.params.id;
    
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
app.post("/products", async (req, res, next) => {
    try {
    const { productName, price, quantity } = req.body;

    if (!productName || !price || !quantity) {
        return res.status(400).json({ error: "Product name, price, and quantity are require!" });
    }

    if (!productName || typeof productName !== "string") {
        return res.status(400).json({ message: "Name is required and must be a string" });
    }

    // const highestId = products.reduce((max, product) => Math.max(max, Number(product.id)), 0 );
    // const nextId = highestId + 1;

    const newProduct = {
        id: String(Date.now()),
        productName: productName,
        price: price,
        quantity: quantity,
    };

    products.push(newProduct);

    return res.status(201).json(newProduct);
    } catch(err) {
        next(err);
    }
});

// Update, edit, rewrite product
app.put("/products/:id", async (req, res, next) => {
    try {
        const product = products.find((p) => String(p.id) === req.params.id);

        if (!product) {
            return res.status(404).json({ error: "Product not found!" });
        }

        const { productName, price, quantity } = req.body;

        if (!productName || !price || !quantity) {
            return res.status(400).json({ error: "Product name, price, and quantity are require!" });
        }

        product.productName = productName;
        product.price = price;
        product.quantity = quantity;

        return res.status(200).json(product);
    } catch(err) {
        next(err);
    }
});

// Patch/edit only a price
app.patch("/products/:id", async (req, res, next) => {
    try {
        const product = products.find(
            (p) => String(p.id) === req.params.id
        );

        if (!product) {
            return res.status(404).json({
                error: "Product not found"
            });
        }

        const { price } = req.body;

        if (price === undefined) {
            return res.status(400).json({
                error: "Price is required!"
            });
        }

        product.price = price;

        return res.status(200).json(product);
    } catch (err) {
        next(err);
    }
});

// Delete a product by id
app.delete("/products/:id", async (req, res, next) => {
    try {
        const index = products.findIndex(p => String(p.id) === req.params.id);

        if (index === -1) {
            return res.status(404).json({ error: "User not found!" });
        }

        const [deleted] = products.splice(index, 1);

        return res.status(200).json(deleted);
    } catch (err) {
        next(err);
    }
});




// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
