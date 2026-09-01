import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ProductDetails.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://e-commerce-backend-two-vert.vercel.app/api/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();

        setProduct(data);

        // Default size/color
        if (data.sizes?.length > 0) {
          setSelectedSize(data.sizes[0]);
        }

        if (data.colors?.length > 0) {
          setSelectedColor(data.colors[0]);
        }
      } catch (error) {
        console.error("Product Detail Error:", error);
        setError("Product load nahi ho saka.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  
  const addToCart = () => {
  const existingCart =
    JSON.parse(localStorage.getItem("cart")) || [];

  const existingProduct = existingCart.find(
    (item) =>
      item.id === product.id &&
      item.selectedSize === selectedSize &&
      item.selectedColor === selectedColor
  );

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    existingCart.push({
      ...product,
      quantity,
      selectedSize,
      selectedColor,
    });
  }

  localStorage.setItem(
    "cart",
    JSON.stringify(existingCart)
  );

  alert("Product added to cart!");
};
  if (loading) {
    return (
      <main className="product-detail-page">
        <div className="product-detail-container">
          <h2>Loading product...</h2>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="product-detail-page">
        <div className="product-detail-container">
          <h2>{error || "Product not found"}</h2>

          <Link to="/shop">
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="product-detail-page">
<Navbar />
      <div className="product-detail-container">

        {/* Breadcrumb */}
        <div className="product-breadcrumb">
          <Link to="/">Home</Link>

          <span>›</span>

          <Link to="/shop">Shop</Link>

          <span>›</span>

          <strong>{product.name}</strong>
        </div>

        {/* Product */}
        <div className="product-detail">

          {/* Image */}
          <div className="product-image-section">

            <div className="product-main-image">
              <img
                src={product.image}
                alt={product.name}
              />
            </div>

          </div>

          {/* Information */}
          <div className="product-info">

            <h1>{product.name}</h1>

            {/* Rating */}
            <div className="product-rating">

              <span className="stars">
                {"★".repeat(
                  Math.round(product.rating || 0)
                )}
              </span>

              <span>
                {product.rating || 0}/5
              </span>

            </div>

            {/* Price */}
            <div className="product-price">

              <span className="current-price">
                ${product.price}
              </span>

              {product.oldPrice && (
                <span className="old-price">
                  ${product.oldPrice}
                </span>
              )}

              {product.discount > 0 && (
                <span className="discount">
                  -{product.discount}%
                </span>
              )}

            </div>

            <p className="product-description">
              Discover the latest style from our
              collection. This product is designed
              for comfort, quality and everyday wear.
            </p>

            {/* Colors */}
            {product.colors?.length > 0 && (
              <div className="product-option">

                <h3>Choose Color</h3>

                <div className="color-options">

                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={
                        selectedColor === color
                          ? "color-btn active"
                          : "color-btn"
                      }
                      onClick={() =>
                        setSelectedColor(color)
                      }
                    >
                      {color}
                    </button>
                  ))}

                </div>

              </div>
            )}

            {/* Sizes */}
            {product.sizes?.length > 0 && (
              <div className="product-option">

                <h3>Choose Size</h3>

                <div className="size-options">

                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={
                        selectedSize === size
                          ? "size-btn active"
                          : "size-btn"
                      }
                      onClick={() =>
                        setSelectedSize(size)
                      }
                    >
                      {size}
                    </button>
                  ))}

                </div>

              </div>
            )}

            {/* Quantity + Cart */}
            <div className="product-actions">

              <div className="quantity-box">

                <button
                  onClick={decreaseQuantity}
                >
                  −
                </button>

                <span>{quantity}</span>

                <button
                  onClick={increaseQuantity}
                >
                  +
                </button>

              </div>

              <button
                className="add-to-cart-btn"
                onClick={addToCart}
              >
                Add to Cart
              </button>

            </div>

          </div>

        </div>

      </div>
<Footer />
    </main>
  );
};

export default ProductDetails;