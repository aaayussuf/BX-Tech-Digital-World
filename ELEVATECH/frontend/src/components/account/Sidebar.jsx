import { Link, NavLink } from "react-router-dom";
import { FaAddressBook, FaBars, FaCogs, FaHeart, FaList, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

export default function Sidebar({ onLogout, basePath = "/account" }) {
  const navStyle = ({ isActive }) => ({
    display: "block",
    padding: "10px 12px",
    borderRadius: 10,
    color: isActive ? "#0ea5e9" : "#111",
    fontWeight: isActive ? 700 : 500,
    textDecoration: "none",
  });

  return (
    <aside style={{ width: 260, padding: 16, borderRight: "1px solid #eee" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: "#0ea5e9", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>
          A
        </div>
        <div>
          <div style={{ fontWeight: 800, lineHeight: 1.1 }}>Account</div>
          <div style={{ color: "#666", fontSize: 12 }}>Customer area</div>
        </div>
      </div>

      <nav>
        <NavLink to={`${basePath}/dashboard`} style={navStyle}>
          <FaBars style={{ marginRight: 8 }} /> Dashboard
        </NavLink>

        <NavLink to={`${basePath}/orders`} style={navStyle}>
          <FaList style={{ marginRight: 8 }} /> My Orders
        </NavLink>

        <NavLink to={`${basePath}/wishlist`} style={navStyle}>
          <FaHeart style={{ marginRight: 8 }} /> Wishlist
        </NavLink>

        <NavLink to={`${basePath}/addresses`} style={navStyle}>
          <FaAddressBook style={{ marginRight: 8 }} /> Addresses
        </NavLink>

        <NavLink to={`${basePath}/profile`} style={navStyle}>
          <FaUserCircle style={{ marginRight: 8 }} /> Profile
        </NavLink>

        <NavLink to={`${basePath}/password`} style={navStyle}>
          <FaCogs style={{ marginRight: 8 }} /> Change Password
        </NavLink>

        <button
          type="button"
          onClick={onLogout}
          style={{
            width: "100%",
            marginTop: 10,
            background: "#fff",
            border: "1px solid #eee",
            borderRadius: 10,
            padding: "10px 12px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontWeight: 600,
          }}
        >
          <FaSignOutAlt /> Logout
        </button>
      </nav>

      <div style={{ marginTop: 18, color: "#666", fontSize: 12 }}>
        <Link to="/" style={{ color: "inherit" }}>
          Back to shop
        </Link>
      </div>
    </aside>
  );
}

