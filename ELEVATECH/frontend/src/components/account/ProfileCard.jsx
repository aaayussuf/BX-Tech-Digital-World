export default function ProfileCard({ user, onChange }) {
  if (!user) {
    return <div style={{ padding: 16, border: "1px solid #eee", borderRadius: 12 }}>No profile loaded.</div>;
  }

  return (
    <div style={{ padding: 16, border: "1px solid #eee", borderRadius: 12 }}>
      <div style={{ fontWeight: 800, marginBottom: 12 }}>Profile</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <div style={{ color: "#666", fontSize: 12 }}>First name</div>
          <div style={{ fontWeight: 700 }}>{user.first_name}</div>
        </div>
        <div>
          <div style={{ color: "#666", fontSize: 12 }}>Last name</div>
          <div style={{ fontWeight: 700 }}>{user.last_name}</div>
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <div style={{ color: "#666", fontSize: 12 }}>Email</div>
          <div style={{ fontWeight: 700 }}>{user.email}</div>
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <div style={{ color: "#666", fontSize: 12 }}>Phone</div>
          <div style={{ fontWeight: 700 }}>{user.phone || "—"}</div>
        </div>
      </div>

      {onChange ? (
        <div style={{ marginTop: 14, color: "#666", fontSize: 12 }}>
          {/** placeholder for future edit UX */}
        </div>
      ) : null}
    </div>
  );
}

