
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./FeaturedBlogCard.css";
import Tag, { tagCategories } from "./UI/Tag";
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

    gsap.set(imageRef.current, { transformStyle: "preserve-3d" });
    const imageRX = gsap.quickTo(imageRef.current, "rotationX", { ease: "power3" });
    const imageRY = gsap.quickTo(imageRef.current, "rotationY", { ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = cardRef.current!.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;

      const tiltX = gsap.utils.interpolate(5, -5, relY / rect.height);
      const tiltY = gsap.utils.interpolate(-5, 5, relX / rect.width);

      imageRX(tiltX);
      imageRY(tiltY);
    };

    const handleMouseLeave = () => {
      imageRX(0);
      imageRY(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <article className="featured-card" ref={cardRef}>
      <div className="card-image" ref={imageRef}>
        <img src="./featured-blog-image.png" alt="Creating Daylight" />
      </div>

      <div className="card-content">
        <span className="card-date">Jan 3, 2025</span>

        <h2 className="card-title">
          Creating Daylight <br /> – The Devex
        </h2>

        <div className="card-tags">
          <Tag labels={[tagCategories.dev, tagCategories.web]} variant="dark" />
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
