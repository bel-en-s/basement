"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import "./MainButton.css";

type Props = {
  text: string;
};

export default function MainButton({ text }: Props) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [animating, setAnimating] = useState(false);
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  const handleEnter = () => {
    if (!btnRef.current || !textRef.current) return;

    const light = btnRef.current.querySelector(".main-btn__bg--light") as HTMLElement;


    gsap.to(light, { opacity: 1, duration: 0.25, ease: "power2.out" });
    gsap.to(btnRef.current, { color: "#000", duration: 0.25 });

    // Scramble
    if (!animating) {
      const originalText = text.toUpperCase();
      const obj = { iteration: 0 };

      gsap.to(obj, {
        iteration: originalText.length,
        duration: 0.8,
        ease: "power1.inOut",
        onStart: () => setAnimating(true),
        onUpdate: () => {
          if (!textRef.current) return;
          textRef.current.innerText = originalText
            .split("")
            .map((letter, index) => {
              if (index < obj.iteration) return originalText[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");
        },
        onComplete: () => {
          if (textRef.current) textRef.current.innerText = originalText;
          setAnimating(false);
        },
      });
    }
  };

  const handleLeave = () => {
    if (!btnRef.current) return;

    const light = btnRef.current.querySelector(".main-btn__bg--light") as HTMLElement;

    gsap.to(light, { opacity: 0, duration: 0.25, ease: "power2.out" });
    gsap.to(btnRef.current, { color: "#E6E6E6", duration: 0.25 });
  };

  return (
    <button
      ref={btnRef}
      className="main-btn group"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <span className="main-btn__bg main-btn__bg--dark" />
      <span className="main-btn__bg main-btn__bg--light" />
      
      <span 
        ref={textRef} 
        className="main-btn__text inline-block min-w-[max-content] text-center"
      >
        {text}
      </span>
    </button>
  );
}