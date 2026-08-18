import { useParams, Link } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();

  return (
    <section className="container section page">
      <Link to="/products" className="back-link">← Back to products</Link>
      <div className="detail-grid">
        <div className="detail-image">
          <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80" alt="Product" />
        </div>
        <div className="detail-content">
          <p className="eyebrow">PRODUCT #{id}</p>
          <h1>Minimal Sneaker</h1>
          <h2>$89</h2>
          <p>Clean everyday sneakers with a comfortable fit and timeless design.</p>
          <button className="btn btn-dark btn-large">Add to cart</button>
        </div>
      </div>
    </section>
  );
}
