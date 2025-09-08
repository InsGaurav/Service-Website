import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const newUser = location.state?.user;
    const storedUser = localStorage.getItem("user");

    if (newUser) {
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    } else if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []); // 👈 only run once on mount

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <main style={{ paddingTop: "5rem" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
