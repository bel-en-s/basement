"use client";

import { useRef, useState, useCallback } from "react";
import gsap from "gsap";
import "./SecondaryButton.css";

type ButtonVariant = "orange" | "light" | "dark";

interface Props {
  text: string;
  variant?: ButtonVariant;
  onClick?: () => void;
  className?: string;
}

export default function SecondaryButton({ 
  text, 
  variant = "orange", 
  onClick, 
  className = "" 
}: Props) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [animating, setAnimating] = useState(false);
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  const handleScramble = useCallback(() => {
    if (animating || !textRef.current) return;

    const originalText = text.toUpperCase();
    const obj = { iteration: 0 };

    gsap.to(obj, {
      iteration: originalText.length,
      duration: 0.7,
      ease: "power1.inOut",
      onStart: () => setAnimating(true),
      onUpdate: () => {
        if (!textRef.current) return;
        textRef.current.innerText = originalText
          .split("")
          .map((_, index) => {
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
  }, [text, animating]);

  return (
    <button
      className={`secondary-btn btn-${variant} ${className}`}
      onMouseEnter={handleScramble}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick();
      }}
    >
      <span className="secondary-btn__container">
        <span className="secondary-btn__ghost">{text}</span>
        <span ref={textRef} className="secondary-btn__text">
          {text}
        </span>
      </span>
    </button>
  );
}