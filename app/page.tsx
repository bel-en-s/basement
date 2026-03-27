"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FeaturedBlogCard from "./components/FeaturedBlogCard";
import Blog from "./components/Blog";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const lines = containerRef.current.querySelectorAll(".line-inner");

    // GSAP toma el control y anima desde el estado oculto de CSS
    gsap.fromTo(
      lines,
      {
        y: 100,
        opacity: 0,
        filter: "blur(10px)",
      },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.15,
        delay: 0.2,
      }
    );
  }, []);

  return (
    <main className="hero">
      <Navbar />

      <div className="hero-inner container-main">
        <h1 ref={containerRef} className="h-hero">
          <span className="block overflow-hidden py-1">
            <span className="line-inner block opacity-0 translate-y-[100px]">
              Research, insights, and the
            </span>
          </span>
          <span className="block overflow-hidden py-1">
            <span className="line-inner block opacity-0 translate-y-[100px]">
              science behind building brands
            </span>
          </span>
          <span className="block overflow-hidden py-1">
            <span className="line-inner block opacity-0 translate-y-[100px]">
              & websites.
            </span>
          </span>
        </h1>
        
        <FeaturedBlogCard />
      </div>

      <Blog />
      <Footer />
    </main>
  );
}