import { Link } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">ELEVATECH</Link>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/cart">
          <FaShoppingCart />
        </Link>
        <Link to="/login">
          <FaUserCircle />
        </Link>
      </div>
    </nav>
  );
}