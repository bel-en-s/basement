"use client";
// falta recuperar parallax de img
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import "./FeaturedBlogCard.css";
import Tag from "./UI/Tag";
import SecondaryButton from "./UI/SecondaryButton";

export default function FeaturedBlogCard() {
  const imageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageRef.current || !cardRef.current) return;

    gsap.to(cardRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      delay: 0.8,
    });

    const rx = gsap.quickTo(imageRef.current, "rotationX", { duration: 0.5, ease: "power3" });
    const ry = gsap.quickTo(imageRef.current, "rotationY", { duration: 0.5, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = cardRef.current!.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      rx((y - 0.5) * -10);
      ry((x - 0.5) * 10);
    };

    const handleMouseLeave = () => {
      rx(0);
      ry(0);
    };

    cardRef.current.addEventListener("mousemove", handleMouseMove);
    cardRef.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (cardRef.current) {
        cardRef.current.removeEventListener("mousemove", handleMouseMove);
        cardRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <article className="featured-card" ref={cardRef}>
      <div className="card-image" ref={imageRef}>
        <Image 
          src="/featured-blog-image.webp" 
          alt="Creating Daylight" 
          width={800} 
          height={500} 
          priority 
        />
      </div>

      <div className="card-content">
        <span className="card-date mono">Jan 3, 2025</span>
        <h2 className="card-title h1">Creating Daylight <br /> – The Devex</h2>
        <div className="card-tags">
          <Tag labels={["Development", "Web Design"]} variant="dark" />
        </div>
        <p className="card-description body">
          We're thrilled to unveil our latest advancement in gene therapy,
          poised to transform the landscape of treatment for rare genetic conditions.
        </p>
        <SecondaryButton text="READ FULL BLOG POST" variant="orange" />
      </div>
    </article>
  );
}