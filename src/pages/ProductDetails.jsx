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
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://e-commerce-backend-delta-tawny.vercel.app/api/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();

        setProduct(data);

        // Default size
        if (data.sizes?.length > 0) {
          setSelectedSize(data.sizes[0]);
        }

        // Default color
        if (data.colors?.length > 0) {
          setSelectedColor(data.colors[0]);
        }

        // Default image
        setSelectedImage(data.image);
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

  const getDiscount = () => {
    if (!product?.oldPrice || product.oldPrice <= product.price) {
      return 0;
    }

    return Math.round(
      ((product.oldPrice - product.price) / product.oldPrice) * 100
    );
  };

  const discount = product?.discount || getDiscount();

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

    // Navbar cart count update
    window.dispatchEvent(new Event("cartUpdated"));

    alert("Product added to cart!");
  };

  // Loading
  if (loading) {
    return (
      <>
        <Navbar />

        <main className="product-detail-page">
          <div className="product-loading">
            <div className="loading-spinner"></div>
            <h2>Loading product...</h2>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  // Error
  if (error || !product) {
    return (
      <>
        <Navbar />

        <main className="product-detail-page">
          <div className="product-error">
            <h2>{error || "Product not found"}</h2>

            <Link to="/shop" className="back-shop-btn">
              Back to Shop
            </Link>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="product-detail-page">

        <div className="product-detail-container">

          {/* =========================
              BREADCRUMB
          ========================= */}

          <div className="product-breadcrumb">
            <Link to="/">Home</Link>

            <span>›</span>

            <Link to="/shop">Shop</Link>

            <span>›</span>

            <Link to="/shop">
              {product.category || "Products"}
            </Link>

            <span>›</span>

            <strong>{product.name}</strong>
          </div>


          {/* =========================
              PRODUCT
          ========================= */}

          <div className="product-detail">

            {/* =========================
                LEFT IMAGE AREA
            ========================= */}

            <div className="product-image-section">

              <div className="product-gallery">

                {/* Thumbnails */}

                <div className="product-thumbnails">

                  <button
                    className="thumbnail active"
                    onClick={() =>
                      setSelectedImage(product.image)
                    }
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                    />
                  </button>

                  <button
                    className="thumbnail"
                    onClick={() =>
                      setSelectedImage(product.image)
                    }
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                    />
                  </button>

                  <button
                    className="thumbnail"
                    onClick={() =>
                      setSelectedImage(product.image)
                    }
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                    />
                  </button>

                </div>


                {/* Main Image */}

                <div className="product-main-image">

                  {discount > 0 && (
                    <span className="product-detail-discount">
                      -{discount}%
                    </span>
                  )}

                  <img
                    src={selectedImage || product.image}
                    alt={product.name}
                  />

                </div>

              </div>

            </div>


            {/* =========================
                PRODUCT INFO
            ========================= */}

            <div className="product-info">

              <h1>{product.name}</h1>


              {/* Rating */}

              <div className="product-rating">

                <span className="stars">
                  {"★".repeat(
                    Math.floor(product.rating || 0)
                  )}

                  {product.rating % 1 >= 0.5 && "★"}
                </span>

                <span className="rating-number">
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

                {discount > 0 && (
                  <span className="discount">
                    -{discount}%
                  </span>
                )}

              </div>


              {/* Description */}

              <p className="product-description">
                This graphic t-shirt is perfect for any
                occasion. Crafted from a soft and breathable
                fabric, it offers superior comfort and style.
              </p>


              <div className="product-divider"></div>


              {/* =========================
                  COLORS
              ========================= */}

              {product.colors?.length > 0 && (
                <div className="product-option">

                  <h3>Choose Color</h3>

                  <div className="color-options">

                    {product.colors.map((color) => (

                      <button
                        key={color}
                        className={`color-btn ${
                          selectedColor === color
                            ? "active"
                            : ""
                        }`}
                        onClick={() =>
                          setSelectedColor(color)
                        }
                        title={color}
                        aria-label={`Select ${color}`}
                      >

                        <span
                          className="color-circle"
                          style={{
                            backgroundColor:
                              color.toLowerCase() ===
                              "white"
                                ? "#ffffff"
                                : color.toLowerCase() ===
                                  "black"
                                ? "#000000"
                                : color.toLowerCase() ===
                                  "blue"
                                ? "#274c77"
                                : color.toLowerCase() ===
                                  "brown"
                                ? "#8b5e3c"
                                : color.toLowerCase() ===
                                  "grey"
                                ? "#808080"
                                : color.toLowerCase(),
                          }}
                        ></span>

                        {selectedColor === color && (
                          <span className="color-check">
                            ✓
                          </span>
                        )}

                      </button>

                    ))}

                  </div>

                </div>
              )}


              {/* =========================
                  SIZE
              ========================= */}

              {product.sizes?.length > 0 && (
                <div className="product-option">

                  <div className="size-heading">
                    <h3>Choose Size</h3>
                  </div>

                  <div className="size-options">

                    {product.sizes.map((size) => (

                      <button
                        key={size}
                        className={`size-btn ${
                          selectedSize === size
                            ? "active"
                            : ""
                        }`}
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


              {/* =========================
                  QUANTITY + CART
              ========================= */}

              <div className="product-actions">

                <div className="quantity-box">

                  <button
                    type="button"
                    onClick={decreaseQuantity}
                  >
                    −
                  </button>

                  <span>{quantity}</span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                  >
                    +
                  </button>

                </div>


                <button
                  type="button"
                  className="add-to-cart-btn"
                  onClick={addToCart}
                >
                  Add to Cart
                </button>

              </div>

            </div>

          </div>


          {/* =========================
              PRODUCT TABS
          ========================= */}

          <div className="product-tabs">

            <button className="product-tab">
              Product Details
            </button>

            <button className="product-tab active">
              Rating & Reviews
            </button>

            <button className="product-tab">
              FAQs
            </button>

          </div>


          {/* Reviews heading */}

          <div className="reviews-heading">

            <h2>
              All Reviews
              <span>({product.rating || 0})</span>
            </h2>

            <button className="write-review-btn">
              Write a Review
            </button>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
};

export default ProductDetails;