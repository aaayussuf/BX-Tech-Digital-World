export default function AddressCard({ address, onEdit, onDelete }) {
  if (!address) return null;

  return (
    <div style={{ padding: 16, border: "1px solid #eee", borderRadius: 12 }}>
      <div style={{ fontWeight: 900, marginBottom: 6 }}>
        {address.label || "Address"}
      </div>
      <div style={{ color: "#444", lineHeight: 1.5 }}>
        {[address.line1, address.line2, address.city, address.state, address.country]
          .filter(Boolean)
          .join(", ")}
      </div>
      <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
        {onEdit ? (
          <button
            type="button"
            onClick={onEdit}
            style={{
              padding: "8px 10px",
              borderRadius: 10,
              border: "1px solid #eee",
              background: "#fff",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            Edit
          </button>
        ) : null}
        {onDelete ? (
          <button
            type="button"
            onClick={onDelete}
            style={{
              padding: "8px 10px",
              borderRadius: 10,
              border: "1px solid #fee2e2",
              background: "#fff5f5",
              cursor: "pointer",
              fontWeight: 700,
              color: "#dc2626",
            }}
          >
            Delete
          </button>
        ) : null}
      </div>
    </div>
  );
}

