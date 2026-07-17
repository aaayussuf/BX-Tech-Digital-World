import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import AccountLayout from "../../layouts/AccountLayout";
import accountService from "../../services/accountService";

export default function Wishlist() {
  const { user, token, isLoading, logout } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        const list = await accountService.getWishlist(token).catch(() => []);
        const arr = Array.isArray(list) ? list : [];
        if (mounted) setItems(arr);
      } catch {
        if (mounted) setItems([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    if (token && !isLoading) load();
    return () => {
      mounted = false;
    };
  }, [isLoading, token]);

  async function remove(itemId) {
    try {
      await accountService.removeWishlist(token, itemId);
      setItems((prev) => prev.filter((x) => (x.id ?? x.wishlist_item_id ?? x.product_id) !== itemId));
    } catch {
      // ignore
    }
  }

  return (
    <AccountLayout user={user} onLogout={logout}>
      <div>
        <h2 style={h2}>Wishlist</h2>
        {loading ? (
          <div>Loading...</div>
        ) : items.length ? (
          <div style={grid}>
            {items.map((w) => {
              const id = w.id ?? w.wishlist_item_id ?? w.product_id;
              const name = w.product_name || w.name || `Product #${w.product_id}`;
              return (
                <div key={id} style={card}>
                  <div style={{ fontWeight: 900, marginBottom: 8 }}>{name}</div>
                  <div style={{ color: "#666" }}>Qty: {w.quantity || 1}</div>
                  <div style={{ color: "#666" }}>Price: {w.price ? `KSh ${Number(w.price).toLocaleString()}` : "—"}</div>
                  <button type="button" style={dangerBtn} onClick={() => remove(id)}>Remove</button>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ color: "#666" }}>Wishlist is empty.</div>
        )}
      </div>
    </AccountLayout>
  );
}


const layoutGrid = { display: "grid", gridTemplateColumns: "260px 1fr", gap: 20 };
const h2 = { fontSize: 22, fontWeight: 900, marginBottom: 10 };
const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 };
const card = { border: "1px solid #eee", borderRadius: 16, padding: 16, background: "#fff" };
const dangerBtn = { marginTop: 12, padding: "9px 12px", borderRadius: 12, border: "1px solid #fee2e2", background: "#fff5f5", color: "#dc2626", fontWeight: 900, cursor: "pointer" };

