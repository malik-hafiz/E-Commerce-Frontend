import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "./NewArrivals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://e-commerce-backend-two-vert.vercel.app/api/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error("New Arrivals Error:", error);
        setError("Products load nahi ho sake.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <main className="new-arrivals-page">
        <div className="new-arrivals-container">
          <div className="shop-loading">
            <h2>Loading products...</h2>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="new-arrivals-page">
        <div className="new-arrivals-container">
          <div className="shop-error">
            <h2>{error}</h2>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="new-arrivals-page">
<Navbar />
      {/* Breadcrumb */}
      <div className="new-arrivals-container">
        <div className="new-arrivals-breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <strong>New Arrivals</strong>
        </div>
      </div>

      {/* Header */}
      <section className="new-arrivals-container">
        <div className="new-arrivals-header">

          <div>
            <h1>NEW ARRIVALS</h1>

            <p>
              Discover our latest styles and newest
              fashion pieces.
            </p>
          </div>

          <div className="new-arrivals-count">
            {products.length} Products
          </div>

        </div>
      </section>

      {/* Products */}
      <section className="new-arrivals-container">

        <div className="new-arrivals-content">

          {/* Filter */}
          <aside className="new-arrivals-filter">

            <h3>Filters</h3>

            <div className="filter-section">
              <h4>Category</h4>

              <label>
                <input type="checkbox" />
                T-Shirts
              </label>

              <label>
                <input type="checkbox" />
                Shirts
              </label>

              <label>
                <input type="checkbox" />
                Jeans
              </label>

              <label>
                <input type="checkbox" />
                Shorts
              </label>
            </div>

            <div className="filter-section">
              <h4>Size</h4>

              <div className="size-buttons">
                <button>XS</button>
                <button>S</button>
                <button>M</button>
                <button>L</button>
                <button>XL</button>
              </div>
            </div>

          </aside>

          {/* Products */}
          <div className="new-arrivals-products">

            <div className="products-topbar">

              <span>
                Showing {products.length} results
              </span>

              <select defaultValue="latest">
                <option value="latest">
                  Latest
                </option>

                <option value="low">
                  Price: Low to High
                </option>

                <option value="high">
                  Price: High to Low
                </option>

                <option value="rating">
                  Top Rated
                </option>
              </select>

            </div>

            <div className="new-products-grid">

              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))
              ) : (
                <p>No products found.</p>
              )}

            </div>

          </div>

        </div>

      </section>
<Footer />
    </main>
  );
};

export default NewArrivals;