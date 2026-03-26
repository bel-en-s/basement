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
          <MainButton text="Contact us" />
          <button className="nav-hamburger">
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
    </header>
  );
}