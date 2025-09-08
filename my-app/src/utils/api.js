// utils/api.js
const API_URL = import.meta.env.VITE_API_URL;

export const signup = async (data) => {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) {
    return { msg: json.msg || "Signup failed" };
  }
  return json; // signup can return whatever you need (user, message, etc.)
};

export const login = async (data) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    return { msg: json.msg || "Login failed" };
  }

  // ✅ Return both token and user
  if (json.token) {
    return { token: json.token, user: json.user };
  } else {
    return { msg: "Login response malformed: no token received" };
  }
};

