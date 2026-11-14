"use client";
import { useEffect } from "react";
import { useLenis } from "@/lib/scroll";
import Navigation from "./Navigation";
import Hero from "./hero/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Work from "./sections/Work";
import Certifications from "./sections/Certifications";
import Experience from "./sections/Experience";
import Achievements from "./sections/Achievements";
import Contact from "./sections/Contact";

export default function App() {
  useLenis();
  // Global reveal observer: adds .is-in once to every .rv
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }), { threshold: 0.15 });
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <>
      <Navigation />
      <main><Hero /><About /><Skills /><Work /><Certifications /><Experience /><Achievements /><Contact /></main>
    </>
  );
}
