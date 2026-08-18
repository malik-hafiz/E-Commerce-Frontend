import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const products = [
  { id: 1, name: "Minimal Sneaker", category: "Shoes", price: 89, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80" },
  { id: 2, name: "Classic Watch", category: "Accessories", price: 129, image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80" },
  { id: 3, name: "Everyday Bag", category: "Bags", price: 74, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80" },
  { id: 4, name: "Basic T-Shirt", category: "Clothing", price: 35, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80" }
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <p className="eyebrow">NEW COLLECTION 2026</p>
          <h1>Simple style.<br />Made for everyday.</h1>
          <p className="hero-copy">
            Discover carefully selected products designed to make everyday life better.
          </p>
          <Link to="/products" className="btn btn-dark btn-large">Shop now</Link>
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <div>
            <p className="eyebrow">FEATURED</p>
            <h2>Popular products</h2>
          </div>
          <Link to="/products" className="text-link">View all →</Link>
        </div>

        <div className="product-grid">
          {products.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section className="container promo">
        <div>
          <p className="eyebrow">DESIGNED FOR YOU</p>
          <h2>Quality products.<br />Honest prices.</h2>
        </div>
        <Link to="/products" className="btn btn-light">Explore collection</Link>
      </section>
    </>
  );
}
