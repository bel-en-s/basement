"use client";

import { useRef } from "react";
import gsap from "gsap";
import "./MainButton.css";

type Props = {
  text: string;
};

export default function MainButton({ text }: Props) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleEnter = () => {
    if (!btnRef.current) return;

    const light = btnRef.current.querySelector(
      ".main-btn__bg--light"
    ) as HTMLElement;

    gsap.to(light, {
      opacity: 1,
      duration: 0.25,
      ease: "power2.out",
    });

    gsap.to(btnRef.current, {
      color: "#000",
      duration: 0.25,
    });
  };

  const handleLeave = () => {
    if (!btnRef.current) return;

    const light = btnRef.current.querySelector(
      ".main-btn__bg--light"
    ) as HTMLElement;

    gsap.to(light, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.out",
    });

    gsap.to(btnRef.current, {
      color: "#E6E6E6",
      duration: 0.25,
    });
  };

  return (
    <button
      ref={btnRef}
      className="main-btn"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <span className="main-btn__bg main-btn__bg--dark" />
      <span className="main-btn__bg main-btn__bg--light" />
      <span className="main-btn__text">{text}</span>
    </button>
  );
}