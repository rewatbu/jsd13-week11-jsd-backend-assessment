function ProductItem({
  product,
  onEdit,
  onDelete,
}) {
  return (
    <article className="product-card">
      <div>
        <h3>{product.productName}</h3>

        <p>Price: ${product.price}</p>

        <p>Quantity: {product.quantity}</p>
      </div>

      <div className="product-actions">
        <button onClick={() => onEdit(product)}>
          Edit
        </button>

        <button
          className="delete-button"
          onClick={() => onDelete(product.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default ProductItem;
