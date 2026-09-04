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

  const [paymentMethod, setPaymentMethod] =
    useState("Cash on Delivery");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.price) *
        Number(item.quantity || 1),
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

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login before placing an order.");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim() ||
      !formData.city.trim()
    ) {
      setError("Please fill all shipping details.");
      return;
    }

    try {
      setLoading(true);

      // Backend ke Order model ke according data
      const orderItems = cart.map((item) => ({
        productId: Number(item.id),

        name: item.name,

        price: Number(item.price),

        quantity: Number(item.quantity || 1),

        size:
          item.selectedSize ||
          item.size ||
          null,

        color:
          item.selectedColor ||
          item.color ||
          null,

        image: item.image,
      }));

      const response = await fetch(
        "https://e-commerce-backend-delta-tawny.vercel.app/orders",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            items: orderItems,

            totalAmount: total,

            shippingAddress: {
              fullName: formData.name,
              phone: formData.phone,
              address: formData.address,
              city: formData.city,
            },

            paymentMethod,
          }),
        }
      );

      const data = await response.json();

      console.log("Order response:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Order failed"
        );
      }

      // Cart clear
      localStorage.removeItem("cart");

      // Navbar cart count update
      window.dispatchEvent(
        new Event("cartUpdated")
      );

      setSuccess(
        "Order placed successfully!"
      );

      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error) {
      console.error(
        "Checkout Error:",
        error
      );

      setError(error.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="checkout-page">

      <Navbar />

      <div className="checkout-container">

        {/* HEADER */}

        <div className="checkout-header">
          <h1>CHECKOUT</h1>

          <p>
            Complete your order by entering
            your shipping details.
          </p>
        </div>

        {/* ERROR */}

        {error && (
          <div className="checkout-error">
            {error}
          </div>
        )}

        {/* SUCCESS */}

        {success && (
          <div className="checkout-success">
            {success}
          </div>
        )}

        <div className="checkout-content">

          {/* =========================
              SHIPPING FORM
          ========================== */}

          <div className="checkout-form-section">

            <h2>Shipping Information</h2>

            <form
              className="checkout-form"
              onSubmit={handlePlaceOrder}
            >

              {/* NAME */}

              <div className="form-group">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />

              </div>

              {/* PHONE */}

              <div className="form-group">

                <label>
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="03XXXXXXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                />

              </div>

              {/* ADDRESS */}

              <div className="form-group">

                <label>
                  Address
                </label>

                <input
                  type="text"
                  name="address"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                />

              </div>

              {/* CITY */}

              <div className="form-group">

                <label>
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={handleChange}
                />

              </div>

              {/* PAYMENT */}

              <div className="payment-section">

                <h2>
                  Payment Method
                </h2>

                <label
                  className={`payment-option ${
                    paymentMethod ===
                    "Cash on Delivery"
                      ? "active"
                      : ""
                  }`}
                >

                  <input
                    type="radio"
                    name="payment"
                    value="Cash on Delivery"
                    checked={
                      paymentMethod ===
                      "Cash on Delivery"
                    }
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value
                      )
                    }
                  />

                  <span className="radio-circle"></span>

                  <div>
                    <strong>
                      Cash on Delivery
                    </strong>

                    <small>
                      Pay when your order arrives
                    </small>
                  </div>

                </label>

                <label
                  className={`payment-option ${
                    paymentMethod === "Card"
                      ? "active"
                      : ""
                  }`}
                >

                  <input
                    type="radio"
                    name="payment"
                    value="Card"
                    checked={
                      paymentMethod === "Card"
                    }
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value
                      )
                    }
                  />

                  <span className="radio-circle"></span>

                  <div>
                    <strong>
                      Card
                    </strong>

                    <small>
                      Pay securely with your card
                    </small>
                  </div>

                </label>

              </div>

              {/* PLACE ORDER */}

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

          {/* =========================
              ORDER SUMMARY
          ========================== */}

          <div className="order-summary">

            <h2>
              Order Summary
            </h2>

            {cart.length === 0 ? (

              <div className="summary-empty">

                <p>
                  Your cart is empty.
                </p>

                <button
                  onClick={() => navigate("/shop")}
                >
                  Continue Shopping
                </button>

              </div>

            ) : (

              <>

                <div className="summary-products">

                  {cart.map((item, index) => (

                    <div
                      className="summary-product"
                      key={`${item.id}-${index}`}
                    >

                      {/* IMAGE */}

                      <div className="summary-image">

                        <img
                          src={item.image}
                          alt={item.name}
                        />

                        <span>
                          {item.quantity || 1}
                        </span>

                      </div>

                      {/* PRODUCT INFO */}

                      <div className="summary-product-info">

                        <h3>
                          {item.name}
                        </h3>

                        <p>
                          Qty:{" "}
                          {item.quantity || 1}
                        </p>

                        {(item.selectedSize ||
                          item.size) && (
                          <p>
                            Size:{" "}
                            {item.selectedSize ||
                              item.size}
                          </p>
                        )}

                        {(item.selectedColor ||
                          item.color) && (
                          <p>
                            Color:{" "}
                            {item.selectedColor ||
                              item.color}
                          </p>
                        )}

                      </div>

                      {/* PRICE */}

                      <strong>
                        $
                        {(
                          Number(item.price) *
                          Number(
                            item.quantity || 1
                          )
                        ).toFixed(2)}
                      </strong>

                    </div>

                  ))}

                </div>

                <div className="summary-divider"></div>

                <div className="summary-row">

                  <span>
                    Subtotal
                  </span>

                  <strong>
                    ${total.toFixed(2)}
                  </strong>

                </div>

                <div className="summary-row">

                  <span>
                    Shipping
                  </span>

                  <strong className="free">
                    Free
                  </strong>

                </div>

                <div className="summary-divider"></div>

                <div className="summary-total">

                  <span>
                    Total
                  </span>

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