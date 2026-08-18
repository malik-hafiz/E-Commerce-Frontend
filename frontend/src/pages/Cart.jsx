import { Link } from "react-router-dom";

export default function Cart() {
  return (
    <section className="container section page">
      <div className="page-heading">
        <p className="eyebrow">YOUR BAG</p>
        <h1>Shopping cart</h1>
      </div>
      <div className="empty-card">
        <h2>Your cart is empty</h2>
        <p>Add some products to get started.</p>
        <Link to="/products" className="btn btn-dark">Continue shopping</Link>
      </div>
    </section>
  );
}
