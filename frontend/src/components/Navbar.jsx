import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import "./Navbar.css";
const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="logo">
          SHOP.CO
        </Link>

        {/* Navigation Links */}
        <nav className="nav-links">
          <Link to="/shop">Shop</Link>
          <Link to="/sale">On Sale</Link>
          <Link to="/new-arrivals">New Arrivals</Link>
          <Link to="/brands">Brands</Link>
        </nav>

        {/* Search */}
        <div className="search-box">
          <span className="search-icon">⌕</span>
          <input
            type="text"
            placeholder="Search for products..."
          />
        </div>

        {/* Actions */}
        <div className="nav-actions">
          <Link to="/search" className="mobile-search">
            ⌕
          </Link>

          <Link to="/cart" className="cart-icon">
            <FiShoppingCart />
          </Link>

          <Link to="/login" className="user-icon">
            <CgProfile />
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Navbar;