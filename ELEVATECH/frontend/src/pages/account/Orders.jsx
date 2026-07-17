import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import AccountLayout from "../../layouts/AccountLayout";
import accountService from "../../services/accountService";
import OrderCard from "../../components/account/OrderCard";

export default function Orders() {
  const { user, token, isLoading, logout } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        const list = await accountService.getOrders(token).catch(() => []);
        if (mounted) setOrders(Array.isArray(list) ? list : []);
      } catch {
        if (mounted) setOrders([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    if (token && !isLoading) load();
    return () => {
      mounted = false;
    };
  }, [isLoading, token]);

  return (
    <AccountLayout user={user} onLogout={logout}>
      <div>
        <h2 style={h2}>My Orders</h2>
        {loading ? (
          <div>Loading...</div>
        ) : orders.length ? (
          <div style={grid}>
            {orders.map((o) => (
              <OrderCard key={o.id} order={o} />
            ))}
          </div>
        ) : (
          <div style={{ color: "#666" }}>No orders yet.</div>
        )}
      </div>
    </AccountLayout>
  );
}


const layoutGrid = { display: "grid", gridTemplateColumns: "260px 1fr", gap: 20 };
const h2 = { fontSize: 22, fontWeight: 900, marginBottom: 10 };
const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 };

