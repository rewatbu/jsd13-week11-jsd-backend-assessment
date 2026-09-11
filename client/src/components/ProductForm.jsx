import { useEffect, useState } from "react";

function ProductForm({
  onSubmit,
  editingProduct,
  onCancel,
}) {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (editingProduct) {
      setProductName(editingProduct.productName);
      setPrice(editingProduct.price);
      setQuantity(editingProduct.quantity);
    } else {
      setProductName("");
      setPrice("");
      setQuantity("");
    }
  }, [editingProduct]);

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit({
      productName,
      price: Number(price),
      quantity: Number(quantity),
    });

    if (!editingProduct) {
      setProductName("");
      setPrice("");
      setQuantity("");
    }
  }

  return (
    <section className="form-section">
      <h2>
        {editingProduct ? "Edit Product" : "Add Product"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name</label>

          <input
            type="text"
            value={productName}
            onChange={(event) =>
              setProductName(event.target.value)
            }
            placeholder="Enter product name"
            required
          />
        </div>

        <div>
          <label>Price</label>

          <input
            type="number"
            value={price}
            onChange={(event) =>
              setPrice(event.target.value)
            }
            placeholder="Enter price"
            min="0"
            required
          />
        </div>

        <div>
          <label>Quantity</label>

          <input
            type="number"
            value={quantity}
            onChange={(event) =>
              setQuantity(event.target.value)
            }
            placeholder="Enter quantity"
            min="0"
            required
          />
        </div>

        <button type="submit">
          {editingProduct ? "Update Product" : "Add Product"}
        </button>

        {editingProduct && (
          <button
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </form>
    </section>
  );
}

export default ProductForm;
