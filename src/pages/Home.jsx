import coupleImage from "../assets/couple.jpg";
import casual from "../assets/casual.png"; 
import formal from "../assets/formal.png";
import party from "../assets/party.png";
import gym from "../assets/gym.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Home.css";

const API_URL = "https://e-commerce-backend-delta-tawny.vercel.app/api/products";

const reviews = [
  {
    name: "Alex K.",
    rating: 5,
    text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options is truly remarkable.",
  },
  {
    name: "James L.",
    rating: 5,
    text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co.",
  },
  {
    name: "Sarah M.",
    rating: 5,
    text: "I'm blown away by the quality and style of the clothes I received. Every piece I've bought has exceeded my expectations.",
  },
];

function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="product-card"
    >
      <div className="product-image-wrapper">
        <img
          src={product.image}
          alt={product.name}
        />

        {product.discount && (
          <span className="discount-badge">
            -{product.discount}%
          </span>
        )}
      </div>

      <h3>{product.name}</h3>

      <div className="rating">
        <span className="stars">
          ★★★★★
        </span>

        <span className="rating-number">
          {product.rating || 0}/5
        </span>
      </div>

      <div className="price-row">
        <span className="price">
          ${product.price}
        </span>

        {product.oldPrice && (
          <span className="old-price">
            ${product.oldPrice}
          </span>
        )}
      </div>
    </Link>
  );
}

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(
            "Products API failed"
          );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error(
            "Invalid products data"
          );
        }

        setProducts(data);
      } catch (error) {
        console.error(
          "Products Error:",
          error
        );

        setError(
          "Products load nahi ho rahe."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const newArrivals = products.slice(0, 4);

  const topSelling = products.slice(4, 8);

  return (
    <main className="home">

      <Navbar />

      <section className="hero">
        <div className="hero-container">

          <div className="hero-content">

            <h1>
              FIND CLOTHES
              <br />
              THAT MATCHES
              <br />
              YOUR STYLE
            </h1>

            <p>
              Browse through our diverse range
              of meticulously crafted garments,
              designed to bring out your
              individuality and cater to your
              sense of style.
            </p>

            <Link
              to="/shop"
              className="shop-btn"
            >
              Shop Now
            </Link>

            <div className="hero-stats">

              <div>
                <h2>200+</h2>
                <span>
                  International Brands
                </span>
              </div>

              <div>
                <h2>2,000+</h2>
                <span>
                  High-Quality Products
                </span>
              </div>

              <div>
                <h2>30,000+</h2>
                <span>
                  Happy Customers
                </span>
              </div>

            </div>

          </div>

          <div className="hero-image">

            <img
              src={coupleImage}
              alt="Fashion models"
            />

            <span className="hero-star star-one">
              ✦
            </span>

            <span className="hero-star star-two">
              ✦
            </span>

          </div>

        </div>
      </section>

      {/* ================= BRANDS ================= */}

      <section className="brands">

        <div className="brands-container">

          <span>VERSACE</span>
          <span>ZARA</span>
          <span>GUCCI</span>
          <span>PRADA</span>

          <span className="calvin">
            Calvin Klein
          </span>

        </div>

      </section>

      {/* ================= NEW ARRIVALS ================= */}

      <section className="products-section">

        <div className="section-heading">
          <h2>NEW ARRIVALS</h2>
        </div>

        {loading ? (

          <div className="products-message">
            Loading products...
          </div>

        ) : error ? (

          <div className="products-message error">
            {error}
          </div>

        ) : newArrivals.length === 0 ? (

          <div className="products-message">
            No products available.
          </div>

        ) : (

          <div className="products-grid">

            {newArrivals.map(
              (product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              )
            )}

          </div>

        )}

        <Link
          to="/shop"
          className="view-all"
        >
          View All
        </Link>

      </section>

      <div className="section-divider" />

      {/* ================= TOP SELLING ================= */}

      <section className="products-section">

        <div className="section-heading">
          <h2>TOP SELLING</h2>
        </div>

        {loading ? (

          <div className="products-message">
            Loading products...
          </div>

        ) : error ? (

          <div className="products-message error">
            {error}
          </div>

        ) : topSelling.length === 0 ? (

          <div className="products-message">
            No top selling products available.
          </div>

        ) : (

          <div className="products-grid">

            {topSelling.map(
              (product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              )
            )}

          </div>

        )}

        <Link
          to="/shop"
          className="view-all"
        >
          View All
        </Link>

      </section>

      {/* ================= DRESS STYLE ================= */}

<section className="dress-style">

  <h2>BROWSE BY DRESS STYLE</h2>

  <div className="style-grid">

    <div className="style-card casual">
      <img
        src={casual}
        alt="Casual"
      />
      <span>Casual</span>
    </div>

    <div className="style-card formal">
      <img
        src={formal}
        alt="Formal"
      />
      <span>Formal</span>
    </div>

    <div className="style-card party">
      <img
        src={party}
        alt="Party"
      />
      <span>Party</span>
    </div>

    <div className="style-card gym">
      <img
        src={gym}
        alt="Gym"
      />
      <span>Gym</span>
    </div>

  </div>

</section>
      {/* ================= REVIEWS ================= */}

      <section className="reviews">

        <div className="reviews-heading">

          <h2>
            OUR HAPPY CUSTOMERS
          </h2>

          <div className="review-arrows">

            <button
              aria-label="Previous review"
            >
              ←
            </button>

            <button
              aria-label="Next review"
            >
              →
            </button>

          </div>

        </div>

        <div className="reviews-grid">

          {reviews.map(
            (review, index) => (

              <article
                className="review-card"
                key={index}
              >

                <div className="review-stars">
                  {"★".repeat(
                    review.rating
                  )}
                </div>

                <div className="review-name">

                  <strong>
                    {review.name}
                  </strong>

                  <span>✓</span>

                </div>

                <p>
                  "{review.text}"
                </p>

              </article>

            )
          )}

        </div>

      </section>

      <Footer />

    </main>
  );
}

export default Home;

