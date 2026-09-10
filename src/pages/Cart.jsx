import { useState } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { MdDelete } from "react-icons/md";
import { FiTag, FiArrowRight } from "react-icons/fi";

const Cart = () => {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch (error) {
      console.error("Cart load error:", error);
      return [];
    }
  });

  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  // Save cart
  const saveCart = (updatedCart) => {
    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Increase quantity
  const increaseQuantity = (index) => {
    const updatedCart = [...cart];

    updatedCart[index] = {
      ...updatedCart[index],
      quantity:
        Number(updatedCart[index].quantity || 1) + 1,
    };

    saveCart(updatedCart);
  };

  // Decrease quantity
  const decreaseQuantity = (index) => {
    const updatedCart = [...cart];

    const currentQuantity =
      Number(updatedCart[index].quantity || 1);

    if (currentQuantity <= 1) {
      return;
    }

    updatedCart[index] = {
      ...updatedCart[index],
      quantity: currentQuantity - 1,
    };

    saveCart(updatedCart);
  };

  // Remove item
  const removeItem = (index) => {
    const updatedCart = cart.filter(
      (_, itemIndex) => itemIndex !== index
    );

    saveCart(updatedCart);
  };

  // Clear cart
  const clearCart = () => {
    saveCart([]);
  };

  // Subtotal
  const subtotal = cart.reduce((total, item) => {
    return (
      total +
      Number(item.price || 0) *
        Number(item.quantity || 1)
    );
  }, 0);

  // 20% discount
  const discount = discountApplied
    ? subtotal * 0.2
    : 0;

  // Delivery
  const deliveryFee = cart.length > 0 ? 15 : 0;

  // Final total
  const total =
    subtotal - discount + deliveryFee;

  // Promo
  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === "SAVE20") {
      setDiscountApplied(true);
    } else {
      setDiscountApplied(false);
      alert("Invalid promo code");
    }
  };

  return (
    <main className="cart-page">

      <Navbar />

      <div className="cart-container">

        {/* Breadcrumb */}
        <div className="cart-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Cart</span>
        </div>

        {/* Heading */}
        <div className="cart-header">

          <h1>YOUR CART</h1>

          {cart.length > 0 && (
            <button
              className="clear-cart-btn"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          )}

        </div>

        {cart.length === 0 ? (

          /* =========================
             EMPTY CART
          ========================= */

          <div className="empty-cart">

            <div className="empty-cart-icon">
              🛒
            </div>

            <h2>Your cart is empty</h2>

            <p>
              Looks like you haven't added
              anything to your cart yet.
            </p>

            <Link
              to="/shop"
              className="continue-shopping-btn"
            >
              Continue Shopping
            </Link>

          </div>

        ) : (

          /* =========================
             CART CONTENT
          ========================= */

          <div className="cart-content">

            {/* =====================
                LEFT SIDE
            ===================== */}

            <div className="cart-items">

              {cart.map((item, index) => (

                <div
                  className="cart-item"
                  key={`${item.id}-${item.selectedSize || ""}-${item.selectedColor || ""}-${index}`}
                >

                  {/* Product Image */}
                  <div className="cart-item-image">

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                  </div>

                  {/* Product Info */}
                  <div className="cart-item-info">

                    <h2>
                      {item.name}
                    </h2>

                    {item.category && (
                      <p className="cart-category">
                        Category: {item.category}
                      </p>
                    )}

                    {item.selectedSize && (
                      <p className="cart-option">
                        Size:{" "}
                        <strong>
                          {item.selectedSize}
                        </strong>
                      </p>
                    )}

                    {item.selectedColor && (
                      <p className="cart-option">
                        Color:{" "}
                        <strong>
                          {item.selectedColor}
                        </strong>
                      </p>
                    )}

                    <p className="cart-item-price">
                      $
                      {Number(item.price || 0).toFixed(2)}
                    </p>

                  </div>

                  {/* Delete */}
                  <button
                    type="button"
                    className="remove-item-btn"
                    onClick={() =>
                      removeItem(index)
                    }
                    aria-label={`Remove ${item.name}`}
                  >
                    <MdDelete />
                  </button>

                  {/* Quantity */}
                  <div className="cart-quantity">

                    <button
                      type="button"
                      onClick={() =>
                        decreaseQuantity(index)
                      }
                    >
                      −
                    </button>

                    <span>
                      {Number(item.quantity || 1)}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        increaseQuantity(index)
                      }
                    >
                      +
                    </button>

                  </div>

                </div>

              ))}

            </div>

            {/* =====================
                RIGHT SIDE
            ===================== */}

            <aside className="cart-summary">

              <h2>Order Summary</h2>

              {/* Subtotal */}
              <div className="summary-row">

                <span>
                  Subtotal
                </span>

                <strong>
                  ${subtotal.toFixed(2)}
                </strong>

              </div>

              {/* Discount */}
              <div className="summary-row">

                <span>
                  Discount (-20%)
                </span>

                <strong className="discount">
                  -${discount.toFixed(2)}
                </strong>

              </div>

              {/* Delivery */}
              <div className="summary-row">

                <span>
                  Delivery Fee
                </span>

                <strong>
                  ${deliveryFee.toFixed(2)}
                </strong>

              </div>

              <div className="summary-divider" />

              {/* Total */}
              <div className="summary-total">

                <span>
                  Total
                </span>

                <strong>
                  ${total.toFixed(2)}
                </strong>

              </div>

              {/* Promo */}
              <div className="promo-wrapper">

                <div className="promo-input-wrapper">

                  <FiTag />

                  <input
                    type="text"
                    placeholder="Add promo code"
                    value={promoCode}
                    onChange={(e) =>
                      setPromoCode(e.target.value)
                    }
                  />

                </div>

                <button
                  type="button"
                  className="apply-btn"
                  onClick={applyPromo}
                >
                  Apply
                </button>

              </div>

              {/* Checkout */}
              <Link
                to="/checkout"
                className="checkout-btn"
              >
                <span>
                  Go to Checkout
                </span>

                <FiArrowRight />
              </Link>

            </aside>

          </div>

        )}

      </div>

      <Footer />

    </main>
  );
};

export default Cart;