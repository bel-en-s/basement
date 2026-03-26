"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FeaturedBlogCard from "./components/FeaturedBlogCard";
import Blog from "./components/Blog";

export default function Home() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    gsap.fromTo(
      titleRef.current,
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2, 
      }
    );
  }, []);

  return (
    <main className="hero">
      <Navbar />

      <div className="hero-inner container-main">
        <h1 ref={titleRef} className="h-hero" style={{ opacity: 0 }}>
          Research, insights, and the
          science behind building brands
          & websites.
        </h1>
        <FeaturedBlogCard />
      </div>

      <Blog />
      <Footer />
    </main>
  );
}