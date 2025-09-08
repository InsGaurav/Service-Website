import React, { useState } from 'react';
import { signup } from "../utils/api";
import { useNavigate } from 'react-router-dom';
import '../styles/sign-up.css'; // Assuming you have a CSS file for styling

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', dob: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup(form);
    if (res.token) {
      localStorage.setItem('token', res.token); // Store the token after successful signup
      alert("Signup successful!");
      navigate('/profile'); // Redirect user to profile page
      // store token if needed: localStorage.setItem("token", res.token)
    } else {
      alert(res.msg || "Signup failed");
    }
  };

  const isDisabled = !form.name.trim() || !form.password.trim();

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Sign Up</h2>
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="dob"
          type="date"
          value={form.dob}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit" disabled={isDisabled}>
          Sign Up
        </button>
        <div>or</div>
        <a href="http://localhost:5000/api/auth/google">Sign up with Google</a>
        <div>Already have an account? <a href="/login">Login</a></div>
        <div>
          By signing up, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
        </div>
        <div>Need help? <a href="/help">Contact us</a></div>
      </form>
    </div>
  );
};

export default Signup;
