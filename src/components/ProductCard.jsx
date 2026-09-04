import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const image =
    product.image ||
    product.images?.[0];

  const rating = product.rating || 4.5;

  const addToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: (item.quantity || 1) + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          image,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    alert("Product added to cart!");
  };

  return (
    <article className="product-card">

      {/* Product Image */}
      <Link
        to={`/product/${product.id}`}
        className="product-card-image"
      >
        <img
          src={image}
          alt={product.name}
        />

        {product.discount && (
          <span className="product-card-discount">
            -{product.discount}%
          </span>
        )}
      </Link>

      {/* Product Information */}
      <div className="product-card-info">

        <Link
          to={`/product/${product.id}`}
          className="product-card-name"
        >
          {product.name}
        </Link>

        {/* Rating */}
        <div className="product-card-rating">

          <span className="stars">
            ★★★★★
          </span>

          <span className="rating-number">
            {rating}/5
          </span>

        </div>

        {/* Price */}
        <div className="product-card-price">

          <span className="current-price">
            ${Number(product.price).toFixed(2)}
          </span>

          {product.oldPrice && (
            <span className="old-price">
              ${Number(product.oldPrice).toFixed(2)}
            </span>
          )}

          {product.discount && (
            <span className="discount">
              -{product.discount}%
            </span>
          )}

        </div>

        {/* Add to Cart */}
        <button
          className="product-card-button"
          onClick={addToCart}
        >
        
        </button>

      </div>

    </article>
  );
};

export default ProductCard;