import ProductCard from "../components/ProductCard";

const products = [
  { id: 1, name: "Minimal Sneaker", category: "Shoes", price: 89, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80" },
  { id: 2, name: "Classic Watch", category: "Accessories", price: 129, image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80" },
  { id: 3, name: "Everyday Bag", category: "Bags", price: 74, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80" },
  { id: 4, name: "Basic T-Shirt", category: "Clothing", price: 35, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80" },
  { id: 5, name: "Denim Jacket", category: "Clothing", price: 110, image: "https://images.unsplash.com/photo-1523205565295-f8e91b3d5eab?auto=format&fit=crop&w=900&q=80" },
  { id: 6, name: "Leather Wallet", category: "Accessories", price: 48, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=80" }
];

export default function Products() {
  return (
    <section className="container section page">
      <div className="page-heading">
        <p className="eyebrow">SHOP</p>
        <h1>All products</h1>
        <p>Browse our latest collection.</p>
      </div>
      <div className="product-grid">
        {products.map(product => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  );
}
