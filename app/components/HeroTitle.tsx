//esto me lo recomendo hacer la ia por si quisiese hacer esto editable desde sanity, pero no me dio el tiempo. No se si lo ideal
//seria tener todos los textos modularizados. 
//puse dos textos para que se vean los cortes exactos
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
        y: "110%",
        opacity: 0,
        filter: "blur(8px)",
      },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.1,
        delay: 0.2,
      }
    );
  }, []);

  return (
    <h1 ref={containerRef} className="h-hero">
      
  
      <div className="hidden md:block">
        <span className="block ">
          <span className="line-inner block opacity-0">
            Research, insights, and the
          </span>
        </span>
        <span className="block ">
          <span className="line-inner block opacity-0">
            science behind building brands
          </span>
        </span>
        <span className="block ">
          <span className="line-inner block opacity-0">
            & websites.
          </span>
        </span>
      </div>

      <div className="block md:hidden leading-[0.9] tracking-tighter">
        <span className="block  pb-0.5">
          <span className="line-inner block opacity-0">
            Research, insights,
          </span>
        </span>
        <span className="blockpb-[2px]">
          <span className="line-inner block opacity-0">
            and the science
          </span>
        </span>
        <span className="block  pb-0.5">
          <span className="line-inner block opacity-0">
            behind building
          </span>
        </span>
        <span className="block pb-0.5">
          <span className="line-inner block opacity-0">
            brands & websites.
          </span>
        </span>
      </div>

    </h1>
  );
}