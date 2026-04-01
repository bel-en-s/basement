"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import MainButton from "./UI/MainButton";
import "./Navbar.css";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!navRef.current) return;

    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  return (
    <header ref={navRef} className="nav-wrapper">
      <nav className="nav nav-dark">
        <div className="nav-left">
          <a href="/">
            <Image
              src="/basement.webp"
              alt="Basement logo"
              width={100}
              height={15}
              priority
            />
          </a>
        </div>

        <div className="nav-center">
          <a href="#showcase" tabIndex={0}>Showcase</a>
          <a href="#services" tabIndex={0}>Services</a>
          <a href="#people" tabIndex={0}>People</a>
          <a href="#laboratory" tabIndex={0}>Laboratory</a>
          <a href="#blog" className="active" tabIndex={0}>Blog</a>
          <a href="#ventures" tabIndex={0}>Ventures</a>
        </div>

        <div className="nav-right">
          <MainButton text="Contact us" />
          <button className="nav-hamburger" aria-label="Toggle menu" tabIndex={0}>
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
    </header>
  );
}

