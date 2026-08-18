export default function Checkout() {
  return (
    <section className="container section page">
      <div className="page-heading">
        <p className="eyebrow">ORDER</p>
        <h1>Checkout</h1>
      </div>
      <div className="checkout-grid">
        <form className="checkout-card">
          <h2>Shipping information</h2>
          <label>Full name<input type="text" /></label>
          <label>Address<input type="text" /></label>
          <label>City<input type="text" /></label>
          <label>Phone<input type="tel" /></label>
          <button className="btn btn-dark btn-large" type="submit">Place order</button>
        </form>
        <aside className="summary">
          <h2>Order summary</h2>
          <p>Subtotal <strong>$0</strong></p>
          <p>Shipping <strong>$0</strong></p>
          <hr />
          <p>Total <strong>$0</strong></p>
        </aside>
      </div>
    </section>
  );
}
