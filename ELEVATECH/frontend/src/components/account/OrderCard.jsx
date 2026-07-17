import { Link } from "react-router-dom";

export default function OrderCard({ order, basePath = "/account/orders" }) {
  if (!order) return null;

  return (
    <div style={{ padding: 16, border: "1px solid #eee", borderRadius: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
        <div style={{ fontWeight: 900 }}>
          Order #{order.id}
        </div>
        <div style={{ color: order.status === "Delivered" ? "#16a34a" : "#111", fontWeight: 700 }}>
          {order.status}
        </div>
      </div>

      <div style={{ marginTop: 6, color: "#666" }}>Total</div>
      <div style={{ fontWeight: 800 }}>KSh {Number(order.total).toLocaleString()}</div>

      <Link
        to={`${basePath}/${order.id}`}
        style={{
          display: "inline-block",
          marginTop: 12,
          color: "#0ea5e9",
          fontWeight: 700,
          textDecoration: "none",
        }}
      >
        View details
      </Link>
    </div>
  );
}

