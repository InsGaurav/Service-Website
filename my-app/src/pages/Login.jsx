import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { login } from "../utils/api";
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(form);
      console.log("Login response:", res);

      if (res.token) {
        // Store token and user details in localStorage
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        console.log("User stored in localStorage:", res.user);
        console.log("Token stored in localStorage:", res.token);
 // assuming res.user contains name/email
        
        
        // Redirect to intended page
        navigate(from, { replace: true, state: { user: res.user } });

      } else {
        alert(res.msg || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Sign In</h2>

        <label>
          Email
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Signing In…" : "Sign In"}
        </button>

        <div className="alt-auth">
          <span>or</span>
          <a href={`${import.meta.env.VITE_API_URL}/auth/google`}>
            Sign in with Google
          </a>
        </div>

        <p className="signup-prompt">
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>

        <p className="legal">
          By signing in, you agree to our{" "}
          <Link to="/terms">Terms of Service</Link> and{" "}
          <Link to="/privacy">Privacy Policy</Link>.
        </p>
      </form>
    </div>
  );
};

export default Login;
