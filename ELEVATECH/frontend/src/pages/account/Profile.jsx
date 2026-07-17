import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import AccountLayout from "../../layouts/AccountLayout";
import accountService from "../../services/accountService";

import ProfileCard from "../../components/account/ProfileCard";

export default function Profile() {
  const { user, token, isLoading, logout } = useContext(AuthContext);



  useEffect(() => {
    if (user) {
      setForm({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        phone: user.phone || "",
      });
    }
  }, [user]);


  const canSave = useMemo(() => {
    return form.first_name.trim() && form.last_name.trim();
  }, [form.first_name, form.last_name]);

  async function loadProfile() {
    try {
      setLoading(true);
      const data = await accountService.getProfile(token);
      if (data) {
        setForm({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          phone: data.phone || "",
        });
      }
    } catch {}
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token && !isLoading) loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, isLoading]);


  async function onSave(e) {
    e.preventDefault();
    if (!canSave || saving) return;

    try {
      setSaving(true);
      await accountService.updateProfile(token, form);
    } catch {}
    finally {
      setSaving(false);
    }
  }

  return (
    <AccountLayout user={user} onLogout={logout}>
      <div>
        <h2 style={h2}>Profile</h2>
        <div style={{ maxWidth: 900 }}>
          <ProfileCard user={user} />

          <form onSubmit={onSave} style={{ marginTop: 16, border: "1px solid #eee", borderRadius: 16, padding: 18 }}>
            <div style={grid2}>
              <label style={field}>
                First name
                <input
                  style={input}
                  value={form.first_name}
                  onChange={(e) => setForm((f) => ({ ...f, first_name: e.target.value }))}
                />
              </label>
              <label style={field}>
                Last name
                <input
                  style={input}
                  value={form.last_name}
                  onChange={(e) => setForm((f) => ({ ...f, last_name: e.target.value }))}
                />
              </label>
              <label style={{ ...field, gridColumn: "1 / -1" }}>
                Phone
                <input
                  style={input}
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                />
              </label>
            </div>

            <div style={{ marginTop: 14, display: "flex", gap: 12, alignItems: "center" }}>
              <button type="submit" disabled={!canSave || saving} style={primaryBtn}>
                {saving ? "Saving..." : "Save changes"}
              </button>
              <div style={{ color: "#666", fontSize: 12 }}>{loading ? "Loading profile..." : null}</div>
            </div>
          </form>
        </div>
      </div>
    </AccountLayout>
  );
}


const layoutGrid = {
  display: "grid",
  gridTemplateColumns: "260px 1fr",
  gap: 20,
};
const h2 = { fontSize: 22, fontWeight: 900, marginBottom: 10 };
const grid2 = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 };
const field = { display: "flex", flexDirection: "column", gap: 6, fontWeight: 700, color: "#111" };
const input = { padding: 10, borderRadius: 10, border: "1px solid #eee", outline: "none" };
const primaryBtn = {
  padding: "10px 14px",
  borderRadius: 12,
  border: "none",
  background: "#0ea5e9",
  color: "#fff",
  fontWeight: 900,
  cursor: "pointer",
};

