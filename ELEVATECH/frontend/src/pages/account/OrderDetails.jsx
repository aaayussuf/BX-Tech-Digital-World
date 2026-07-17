import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function OrderDetails() {
  const { token, isLoading } = useContext(AuthContext);
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !token) navigate("/login");
  }, [isLoading, navigate, token]);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_BASE || ""}/api/orders/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const data = await res.json().catch(() => null);
        if (mounted) setOrder(data?.order || data || null);
      } catch {
        if (mounted) setOrder(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    if (token && !isLoading) load();
    return () => {
      mounted = false;
    };
  }, [id, isLoading, token]);

  return (
    <div style={layoutGrid}>
      <div />
      <div>
        <h2 style={h2}>Order #{id}</h2>
        {loading ? (
          <div>Loading...</div>
        ) : order ? (
          <div style={{ border: "1px solid #eee", borderRadius: 16, padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
              <div>
                <div style={{ color: "#666" }}>Status</div>
                <div style={{ fontWeight: 900 }}>{order.status || "—"}</div>
              </div>
              <div>
                <div style={{ color: "#666" }}>Total</div>
                <div style={{ fontWeight: 900 }}>KSh {Number(order.total || 0).toLocaleString()}</div>
              </div>
            </div>

            <div style={{ marginTop: 16, fontWeight: 900 }}>Items</div>
            <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
              {(order.items || []).length ? (
                order.items.map((it) => (
                  <div key={it.id || `${it.product_id}`}
                       style={{ border: "1px solid #eee", borderRadius: 12, padding: 12 }}>
                    <div style={{ fontWeight: 900 }}>{it.product_name || `Product #${it.product_id}`}</div>
                    <div style={{ color: "#666" }}>Qty: {it.quantity}</div>
                    <div style={{ color: "#666" }}>Price: KSh {Number(it.price || 0).toLocaleString()}</div>
                  </div>
                ))
              ) : (
                <div style={{ color: "#666" }}>No items found for this order yet.</div>
              )}
            </div>
          </div>
        ) : (
          <div style={{ color: "#666" }}>Order not found.</div>
        )}
      </div>
    </div>
  );
}

const layoutGrid = { display: "grid", gridTemplateColumns: "260px 1fr", gap: 20 };
const h2 = { fontSize: 22, fontWeight: 900, marginBottom: 10 };

