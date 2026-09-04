import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "./Shop.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://e-commerce-backend-delta-tawny.vercel.app/api/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error(error);
        setError("Products load nahi ho sake.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="shop-loading">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="shop-error">
        {error}
      </div>
    );
  }

  return (
    <main className="shop-page">
      <Navbar />

      <div className="shop-container">

        <div className="shop-header">
          <h1>SHOP</h1>

          <p>
            Browse our collection and find your
            favorite products.
          </p>
        </div>

        <div className="products-grid">

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
<Footer />
    </main>
  );
};

export default Shop;