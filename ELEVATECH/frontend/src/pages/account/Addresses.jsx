import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import AccountLayout from "../../layouts/AccountLayout";
import accountService from "../../services/accountService";

import AddressCard from "../../components/account/AddressCard";

export default function Addresses() {
  const { user, token, isLoading, logout } = useContext(AuthContext);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    label: "Home",
    line1: "",
    line2: "",
    city: "",
    state: "",
    country: "Kenya",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        const list = await accountService.getAddresses(token).catch(() => []);
        if (mounted) setAddresses(Array.isArray(list) ? list : []);
      } catch {
        if (mounted) setAddresses([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    if (token && !isLoading) load();

    return () => {
      mounted = false;
    };
  }, [isLoading, token]);

  async function createAddress(e) {
    e.preventDefault();
    try {
      setSaving(true);
      const created = await accountService.createAddress(token, form).catch(() => null);
      if (created) setAddresses((prev) => [created, ...prev]);
      setForm({ label: "Home", line1: "", line2: "", city: "", state: "", country: "Kenya" });
    } catch {}
    finally {
      setSaving(false);
    }
  }

  async function remove(addressId) {
    try {
      await accountService.deleteAddress(token, addressId);
      setAddresses((prev) => prev.filter((x) => (x.id ?? x.address_id) !== addressId));
    } catch {}
  }

  return (
    <AccountLayout user={user} onLogout={logout}>
      <div>
        <h2 style={h2}>Addresses</h2>

        {loading ? (
          <div>Loading...</div>
        ) : addresses.length ? (
          <div style={grid}>
            {addresses.map((a) => (
              <AddressCard key={a.id ?? a.address_id} address={a} onDelete={() => remove(a.id ?? a.address_id)} />
            ))}
          </div>
        ) : (
          <div style={{ color: "#666" }}>No saved addresses yet.</div>
        )}

        <form onSubmit={createAddress} style={{ marginTop: 16, border: "1px solid #eee", borderRadius: 16, padding: 18 }}>
          <div style={{ fontWeight: 900, marginBottom: 10 }}>Add new address</div>
          <div style={grid2}>
            <label style={field}>
              Label
              <input style={input} value={form.label} onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))} />
            </label>
            <label style={field}>
              Country
              <input style={input} value={form.country} onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))} />
            </label>
            <label style={{ ...field, gridColumn: "1 / -1" }}>
              Line 1
              <input style={input} value={form.line1} onChange={(e) => setForm((f) => ({ ...f, line1: e.target.value }))} />
            </label>
            <label style={{ ...field, gridColumn: "1 / -1" }}>
              Line 2
              <input style={input} value={form.line2} onChange={(e) => setForm((f) => ({ ...f, line2: e.target.value }))} />
            </label>
            <label style={field}>
              City
              <input style={input} value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} />
            </label>
            <label style={field}>
              State
              <input style={input} value={form.state} onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))} />
            </label>
          </div>
          <button type="submit" disabled={saving || !form.line1.trim()} style={primaryBtn}>
            {saving ? "Saving..." : "Save address"}
          </button>
        </form>
      </div>
    </AccountLayout>
  );
}


const layoutGrid = { display: "grid", gridTemplateColumns: "260px 1fr", gap: 20 };
const h2 = { fontSize: 22, fontWeight: 900, marginBottom: 10 };
const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 };
const grid2 = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 };
const field = { display: "flex", flexDirection: "column", gap: 6, fontWeight: 800, color: "#111" };
const input = { padding: 10, borderRadius: 10, border: "1px solid #eee", outline: "none" };
const primaryBtn = { marginTop: 14, padding: "10px 14px", borderRadius: 12, border: "none", background: "#0ea5e9", color: "#fff", fontWeight: 900, cursor: "pointer" };

