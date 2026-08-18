import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="logo">HAFIZ<span>STORE</span></Link>

        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Shop</NavLink>
          <NavLink to="/cart">Cart</NavLink>
        </nav>

        <div className="nav-actions">
          <Link to="/login" className="login-link">Login</Link>
          <Link to="/signup" className="btn btn-dark">Sign up</Link>
        </div>
      </div>
    </header>
  );
}
