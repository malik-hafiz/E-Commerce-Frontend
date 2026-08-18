import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-image">
        <img src={product.image} alt={product.name} />
      </Link>
      <div className="product-info">
        <p className="muted">{product.category}</p>
        <h3>{product.name}</h3>
        <strong>${product.price}</strong>
      </div>
    </article>
  );
}
