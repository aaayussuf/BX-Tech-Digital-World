import { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import AccountLayout from "../../layouts/AccountLayout";
import accountService from "../../services/accountService";
import OrderCard from "../../components/account/OrderCard";

export default function Dashboard() {
  const { user, token, isLoading, logout } = useContext(AuthContext);

  const [stats, setStats] = useState({
    totalOrders: 0,
    wishlistCount: 0,
    savedAddresses: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentWishlist, setRecentWishlist] = useState([]);

  const [loading, setLoading] = useState(true);

  const fullName = useMemo(() => {
    const first = user?.first_name || "";
    const last = user?.last_name || "";
    return `${first} ${last}`.trim() || "Customer";
  }, [user]);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);

        const [ordersRes, addressesRes, wishlistRes] = await Promise.all([
          accountService.getOrders(token).catch(() => []),
          accountService.getAddresses(token).catch(() => []),
          accountService.getWishlist(token).catch(() => []),
        ]);

        const ordersList = Array.isArray(ordersRes) ? ordersRes : [];
        const addressesList = Array.isArray(addressesRes) ? addressesRes : [];
        const wishlistList = Array.isArray(wishlistRes) ? wishlistRes : [];

        if (!mounted) return;

        setStats({
          totalOrders: ordersList.length,
          wishlistCount: wishlistList.length,
          savedAddresses: addressesList.length,
        });

        setRecentOrders(ordersList.slice(0, 1_00).slice(0, 4));
        setRecentWishlist(wishlistList.slice(0, 3));
      } finally {
        if (mounted) setLoading(false);
      }
    }

    if (!isLoading && token) load();

    return () => {
      mounted = false;
    };
  }, [isLoading, token]);

  return (
    <AccountLayout user={user} onLogout={logout}>
      <div style={{ maxWidth: 980 }}>
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <div style={{ color: "#666", fontWeight: 900, marginBottom: 6 }}>CUSTOMER ACCOUNT</div>
          <div style={{ fontSize: 18, fontWeight: 900 }}>Welcome {fullName}</div>
        </div>

        <div style={statsRow}>
          <div style={statCell}>
            Orders
            <div style={statNum}>{stats.totalOrders}</div>
          </div>
          <div style={statCell}>
            Wishlist
            <div style={statNum}>{stats.wishlistCount}</div>
          </div>
          <div style={statCell}>
            Addresses
            <div style={statNum}>{stats.savedAddresses}</div>
          </div>
        </div>

        <div style={grid}>
          <section style={panel}>
            <div style={panelTitle}>Recent Orders</div>
            {loading ? (
              <div>Loading...</div>
            ) : recentOrders.length ? (
              <div style={cardsGrid}>
                {recentOrders.map((o) => (
                  <OrderCard key={o.id} order={o} />
                ))}
              </div>
            ) : (
              <div style={muted}>
                No recent orders yet. <Link to="/account/orders">View all</Link>
              </div>
            )}
          </section>

          <section style={panel}>
            <div style={panelTitle}>Recent Wishlist</div>
            {loading ? (
              <div>Loading...</div>
            ) : recentWishlist.length ? (
              <div style={list}>
                {recentWishlist.map((w) => {
                  const id = w.id ?? w.wishlist_item_id ?? w.product_id;
                  const name = w.product_name || w.name || w.title || `Product #${w.product_id || id}`;
                  return (
                    <div key={id} style={listItem}>
                      {name}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={muted}>Wishlist is empty.</div>
            )}
          </section>
        </div>
      </div>
    </AccountLayout>
  );
}

const statsRow = {
  display: "flex",
  gap: 14,
  justifyContent: "center",
  marginBottom: 18,
};

const statCell = {
  border: "1px solid #eee",
  borderRadius: 16,
  padding: "14px 18px",
  background: "#fff",
  minWidth: 190,
  textAlign: "center",
  fontWeight: 900,
};

const statNum = { fontSize: 18, marginTop: 6 };

const grid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 16,
};

const panel = {
  border: "1px solid #eee",
  borderRadius: 16,
  padding: 18,
  background: "#fff",
};

const panelTitle = { fontWeight: 900, marginBottom: 12 };

const cardsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 12,
};

const list = { display: "grid", gap: 8 };
const listItem = { fontWeight: 900 };

const muted = { color: "#666" };

