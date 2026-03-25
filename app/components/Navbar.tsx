"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import "./Navbar.css";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!navRef.current) return;

    gsap.fromTo(
      navRef.current,
      {
        y: -80,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 2.8,
        ease: "power3.out",
        delay: 1.8,
      }
    );
  }, []);

  return (
    <header ref={navRef} className="nav-wrapper">
      <nav className="nav nav-dark">
        <div className="nav-left">
          <Image
            src="/basement.png"
            alt="Basement logo"
            width={100}
            height={15}
            priority
          />
        </div>

        <div className="nav-center">
          <a>Showcase</a>
          <a>Services</a>
          <a>People</a>
          <a>Laboratory</a>
          <a className="active">Blog</a>
          <a>Ventures</a>
        </div>

        <div className="nav-right">
          <button className="nav-cta">CONTACT US</button>
        </div>
      </nav>
    </header>
  );
}