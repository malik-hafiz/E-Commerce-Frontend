import { useState } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { MdDelete } from "react-icons/md";
const Cart = () => {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch (error) {
      console.error("Cart load error:", error);
      return [];
    }
  });

  // Save cart to localStorage
  const saveCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    // Navbar/cart count ko update karne ke liye event
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Increase quantity
  const increaseQuantity = (index) => {
    const updatedCart = [...cart];

    updatedCart[index] = {
      ...updatedCart[index],
      quantity: Number(updatedCart[index].quantity) + 1,
    };

    saveCart(updatedCart);
  };

  // Decrease quantity
  const decreaseQuantity = (index) => {
    const updatedCart = [...cart];

    const currentQuantity =
      Number(updatedCart[index].quantity);

    if (currentQuantity <= 1) {
      return;
    }

    updatedCart[index] = {
      ...updatedCart[index],
      quantity: currentQuantity - 1,
    };

    saveCart(updatedCart);
  };

  // Remove product
  const removeItem = (index) => {
    const updatedCart = cart.filter(
      (_, itemIndex) => itemIndex !== index
    );

    saveCart(updatedCart);
  };

  // Clear complete cart
  const clearCart = () => {
    saveCart([]);
  };

  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => {
    return (
      total +
      Number(item.price) *
        Number(item.quantity)
    );
  }, 0);

  // Shipping
  const shipping = cart.length > 0 ? 0 : 0;

  // Final total
  const total = subtotal + shipping;

  return (
    <main className="cart-page">
<Navbar />
      <div className="cart-container">

        {/* Header */}
        <div className="cart-header">
          <div>
            <p className="cart-breadcrumb">
              Home / Cart
            </p>

            <h1>YOUR CART</h1>
          </div>

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

          /* Empty Cart */
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

          /* Cart Content */
          <div className="cart-content">

            {/* Cart Items */}
            <div className="cart-items">

              {cart.map((item, index) => (

                <div
                  className="cart-item"
                  key={`${item.id}-${item.selectedSize || ""}-${item.selectedColor || ""}`}
                >

                  {/* Image */}
                  <div className="cart-item-image">

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                  </div>

                  {/* Product Information */}
                  <div className="cart-item-info">

                    <h2>{item.name}</h2>

                    {item.category && (
                      <p className="cart-category">
                        {item.category}
                      </p>
                    )}

                    {item.selectedSize && (
                      <p>
                        Size:{" "}
                        <strong>
                          {item.selectedSize}
                        </strong>
                      </p>
                    )}

                    {item.selectedColor && (
                      <p>
                        Color:{" "}
                        <strong>
                          {item.selectedColor}
                        </strong>
                      </p>
                    )}

                    <p className="cart-item-price">
                      ${item.price.toFixed(2)}
                    </p>

                  </div>

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
                      {item.quantity}
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

                  {/* Item Total */}
                  <div className="cart-item-total">

                    $
                    {(
                      Number(item.price) *
                      Number(item.quantity)
                    ).toFixed(2)}

                  </div>

                  {/* Remove */}
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

                </div>

              ))}

            </div>

            {/* Summary */}
            <aside className="cart-summary">

              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Subtotal</span>

                <strong>
                  ${subtotal.toFixed(2)}
                </strong>
              </div>

              <div className="summary-row">
                <span>Shipping</span>

                <strong>
                  {shipping === 0
                    ? "Free"
                    : `$${shipping.toFixed(2)}`}
                </strong>
              </div>

              <div className="summary-divider" />

              <div className="summary-total">
                <span>Total</span>

                <strong>
                  ${total.toFixed(2)}
                </strong>
              </div>

              <Link
                to="/checkout"
                className="checkout-btn"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/shop"
                className="continue-shopping-link"
              >
                Continue Shopping
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
