"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroTitle() {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const lines = containerRef.current.querySelectorAll(".line-inner");

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
    <h1 ref={containerRef} className="h-hero">
      <span className="block overflow-hidden py-1">
        <span className="line-inner block opacity-0">
          Research, insights, and the
        </span>
      </span>
      <span className="block overflow-hidden py-1">
        <span className="line-inner block opacity-0">
          science behind building brands
        </span>
      </span>
      <span className="block overflow-hidden py-1">
        <span className="line-inner block opacity-0">
          & websites.
        </span>
      </span>
    </h1>
  );
}