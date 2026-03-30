"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import "./FeaturedBlogCard.css";
import Tag from "./UI/Tag";
import SecondaryButton from "./UI/SecondaryButton";

interface FeaturedBlogProps {
  data: {
    title: string;
    image: string;
    date: string;
    categories: string[];
    slug: string;
    description?: string;
  };
}

export default function FeaturedBlogCard({ data }: FeaturedBlogProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (!data || !imageRef.current || !cardRef.current) return;

 
    gsap.set(cardRef.current, { y: 30, opacity: 0 });

    // Animación de entrada
    gsap.to(cardRef.current, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power4.out",
      delay: 0.5,
    });


    const rx = gsap.quickTo(imageRef.current, "rotationX", { duration: 0.5, ease: "power3" });
    const ry = gsap.quickTo(imageRef.current, "rotationY", { duration: 0.5, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      rx((y - 0.5) * -10);
      ry((x - 0.5) * 10);
    };

    const handleMouseLeave = () => {
      rx(0);
      ry(0);
    };

    const currentCard = cardRef.current;
    currentCard.addEventListener("mousemove", handleMouseMove);
    currentCard.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      currentCard.removeEventListener("mousemove", handleMouseMove);
      currentCard.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [data]); // Se dispara cuando la data llega

  if (!data) return null;

  return (
    <article className="featured-card" ref={cardRef}>
      <div className="card-image" ref={imageRef}>
        {data.image ? (
          <Image 
            src={data.image} 
            alt={data.title} 
            width={800} 
            height={500} 
            priority 
            className="featured-img-render"
          />
        ) : (
          <div className="placeholder-img" style={{ width: 800, height: 500, background: '#222' }} />
        )}
      </div>

      <div className="card-content">
        <span className="card-date mono">
          {data.date ? new Date(data.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          }) : "Recent Post"}
        </span>
        

        <h2 className="card-title h1">{data.title}</h2>
        
        <div className="card-tags">
          {data.categories?.length > 0 && (
            <Tag labels={data.categories} variant="dark" />
          )}
        </div>
        
  <p className="card-description body">
          {data.description ? (
            data.description.length > 160 
              ? `${data.description.substring(0, 160)}...` 
              : data.description
          ) : (
            "No description available for this post."
          )}
        </p>

       <Link href={`/blog/${data.slug}`} className="inline-block">
            <SecondaryButton text="Read More" variant="orange" />
          </Link>
      </div>
    </article>
  );
}