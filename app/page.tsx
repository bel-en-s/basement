
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import Navbar from "./components/Navbar";

export default function Home() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const el = titleRef.current;

    const split = new SplitType(el, {
      types: "words,chars",
    });

    const chars = split.chars;

    gsap.set(el, { opacity: 1 });

    gsap.fromTo(
      chars,
      {
        y: 80,
        opacity: 0,
        filter: "blur(6px)",
      },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.4,
        ease: "power3.inout",
        stagger: 0.025,
      }
    );

    return () => {
      split.revert();
    };
  }, []);

  return (
    <main className="hero">
      <Navbar />

      <div className="hero-inner container-main">
        <h1 ref={titleRef} className="h-hero">
          Research, insights, and the{" "}
          <br />
          science behind building brands{" "}
          <br />
          & websites.
        </h1>
      </div>
    </main>
  );
}

