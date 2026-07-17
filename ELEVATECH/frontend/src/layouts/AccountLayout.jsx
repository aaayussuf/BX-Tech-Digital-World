import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/account/Sidebar";

export default function AccountLayout({ children, onLogout, user }) {
  const navigate = useNavigate();

  const fullName = useMemo(() => {
    const first = user?.first_name || user?.firstName || "";
    const last = user?.last_name || user?.lastName || "";
    return `${first} ${last}`.trim() || "Customer";
  }, [user]);

  return (
    <div style={page}>
      <div style={headerWrap}>
        <div style={header}>CUSTOMER ACCOUNT</div>
      </div>

      <div style={bodyGrid}>
        <Sidebar
          onLogout={
            onLogout ||
            (() => {
              navigate("/login");
            })
          }
          basePath="/account"
        />

        <main style={main}>{children}</main>
      </div>

      <div style={{ marginTop: 8, marginLeft: 280, color: "#666", fontWeight: 800 }}>
        Welcome {fullName}
      </div>
    </div>
  );
}

const page = { padding: "18px 22px 30px" };
const headerWrap = { border: "1px solid #eee", borderRadius: 14, padding: 16, background: "#fff" };
const header = {
  textAlign: "center",
  fontSize: 18,
  fontWeight: 900,
  letterSpacing: 0.5,
};
const bodyGrid = {
  display: "grid",
  gridTemplateColumns: "260px 1fr",
  gap: 18,
  marginTop: 16,
};
const main = { minHeight: 280 };

