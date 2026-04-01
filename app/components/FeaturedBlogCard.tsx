"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import "./FeaturedBlogCard.css";
import Tag from "./UI/Tag";
import SecondaryButton from "./UI/SecondaryButton";
import Image from "next/image";

interface FeaturedBlogProps {
  data: {
    title: string;
    image: string;
    date: string;
    featuredText: string;
    categories: string[];
    slug: string;
    description?: string;
  };
}

export default function FeaturedBlogCard({ data }: FeaturedBlogProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (cardRef.current) gsap.to(cardRef.current, { y: -10, duration: 0.4, ease: "power2.out", overwrite: true });
  };

  const handleMouseLeave = () => {
    if (cardRef.current) gsap.to(cardRef.current, { y: 0, duration: 0.4, ease: "power2.out", overwrite: true });
  };

  if (!data) return null;

  return (
    <div style={{ animation: "card-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both" }}>
    <article 
      className="featured-card" 
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-image">
        {data.image ? (
          <Image
            src={data.image}
            alt={data.title}
            className="featured-img-render"
            fill
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className="placeholder-img" style={{ width: 800, height: 500, background: '#222' }} />
        )}
      </div>

      <div className="card-content">
        <span className="card-date">
          {data.date ? new Date(data.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          }) : "Recent Post"}
        </span>

        <h2 className="featured-card-title">{data.title}</h2>

        <div className="card-tags">
          {data.categories?.length > 0 && (
            <Tag labels={data.categories} variant="dark" />
          )}
        </div>

        <p className="card-description body">
          {data.featuredText ? (
            data.featuredText.length > 160
              ? `${data.featuredText.substring(0, 160)}...`
              : data.featuredText
          ) : (
            "No description available for this post."
          )}
        </p>

        <Link href={`/blog/${data.slug}`} className="inline-block">
          <SecondaryButton text="Read More" variant="orange" />
        </Link>
      </div>
    </article>
    </div>
  );
}