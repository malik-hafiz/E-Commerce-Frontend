import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Checkout = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  const [paymentMethod, setPaymentMethod] = useState(
    "Cash on Delivery"
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Cart localStorage se lena
  const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  // Total calculate
  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * Number(item.quantity),
    0
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Login check
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login before placing an order.");
      return;
    }

    // Cart check
    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    // Form validation
    if (
      !formData.name ||
      !formData.phone ||
      !formData.address ||
      !formData.city
    ) {
      setError("Please fill all shipping details.");
      return;
    }

    try {
      setLoading(true);

      const orderItems = cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        size: item.selectedSize || item.size || null,
        color: item.selectedColor || item.color || null,
      }));

      const response = await fetch(
        "https://e-commerce-backend-two-vert.vercel.app/orders",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            items: orderItems,

            shippingAddress: {
              name: formData.name,
              phone: formData.phone,
              address: formData.address,
              city: formData.city,
            },

            paymentMethod,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Order failed"
        );
      }

      // Cart clear
      localStorage.removeItem("cart");

      setSuccess(
        `Order #${data.order.id} placed successfully!`
      );

      // Order complete hone ke baad home
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Checkout Error:", error);

      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="checkout-page">
      <Navbar />

      <div className="checkout-container">

        <div className="checkout-header">
          <h1>CHECKOUT</h1>

          <p>
            Complete your order by entering your
            shipping details.
          </p>
        </div>

        {error && (
          <div className="checkout-error">
            {error}
          </div>
        )}

        {success && (
          <div className="checkout-success">
            {success}
          </div>
        )}

        <div className="checkout-content">

          {/* Shipping Form */}
          <div className="checkout-form-section">

            <h2>Shipping Information</h2>

            <form onSubmit={handlePlaceOrder}>

              <div className="form-group">
                <label>Full Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="03XXXXXXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Address</label>

                <input
                  type="text"
                  name="address"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>City</label>

                <input
                  type="text"
                  name="city"
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <h2>Payment Method</h2>

              <div className="payment-options">

                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="Cash on Delivery"
                    checked={
                      paymentMethod ===
                      "Cash on Delivery"
                    }
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                  />

                  <span>Cash on Delivery</span>
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="Card"
                    checked={
                      paymentMethod === "Card"
                    }
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                  />

                  <span>Card</span>
                </label>

              </div>

              <button
                type="submit"
                className="place-order-btn"
                disabled={loading}
              >
                {loading
                  ? "Placing Order..."
                  : "Place Order"}
              </button>

            </form>

          </div>

          {/* Order Summary */}
          <div className="order-summary">

            <h2>Order Summary</h2>

            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                {cart.map((item, index) => (
                  <div
                    className="summary-product"
                    key={`${item.id}-${index}`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div>
                      <h3>{item.name}</h3>

                      <p>
                        Qty: {item.quantity}
                      </p>

                      {item.selectedSize && (
                        <p>
                          Size:{" "}
                          {item.selectedSize}
                        </p>
                      )}

                      {item.selectedColor && (
                        <p>
                          Color:{" "}
                          {item.selectedColor}
                        </p>
                      )}
                    </div>

                    <strong>
                      $
                      {Number(item.price) *
                        Number(item.quantity)}
                    </strong>
                  </div>
                ))}

                <div className="summary-total">
                  <span>Total</span>

                  <strong>
                    ${total.toFixed(2)}
                  </strong>
                </div>
              </>
            )}

          </div>

        </div>

      </div>
<Footer />
    </main>
  );
};

export default Checkout;
