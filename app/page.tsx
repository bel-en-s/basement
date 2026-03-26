"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Navbar from "./components/Navbar";

export default function Home() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const el = titleRef.current;
    let splitInstance: any;

    const run = async () => {
      const { default: SplitType } = await import("split-type");

      splitInstance = new SplitType(el, {
        types: "words,chars", // ← FIX
      });

      const chars = splitInstance.chars;

      gsap.set(el, { opacity: 1 });

      gsap.fromTo(
        chars,
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.02,
        }
      );
    };

    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(run);
    } else {
      setTimeout(run, 100);
    }

    return () => {
      // cleanup importante para evitar duplicaciones
      if (splitInstance) {
        splitInstance.revert();
      }
    };
  }, []);

  return (
    <main className="hero">
      <Navbar />

      <div className="hero-inner container-main">
        <h1 ref={titleRef} className="h-hero" style={{ opacity: 0 }}>
          Research, insights, and the <br />
          science behind building brands <br />
          & websites.
        </h1>
      </div>
    </main>
  );
}