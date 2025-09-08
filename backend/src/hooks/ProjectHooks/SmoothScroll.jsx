import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    const links = document.querySelectorAll(".nav-link, .footer-nav a");
    const handleClick = (e) => {
      const href = e.target.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.getElementById(href.slice(1));
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    links.forEach((link) => link.addEventListener("click", handleClick));

    return () => links.forEach((link) => link.removeEventListener("click", handleClick));
  }, []);

  return null;
}
