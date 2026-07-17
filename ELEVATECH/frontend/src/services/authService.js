import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "/api";

function withAuth(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

async function login({ email, password }) {
  const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
  // expected: { token, user }
  return res.data;
}

async function logout(token) {
  // backend might require POST /api/auth/logout; we keep it ready
  try {
    await axios.post(`${API_BASE}/auth/logout`, {}, withAuth(token));
  } catch {
    // ignore if endpoint not implemented yet
  }
}

async function me(token) {
  const res = await axios.get(`${API_BASE}/auth/me`, withAuth(token));
  return res.data;
}

export default {
  login,
  logout,
  me,
};

