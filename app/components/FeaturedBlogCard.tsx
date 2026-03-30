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
    featuredText: string;
    categories: string[];
    slug: string;
    description?: string;
  };
}

export default function FeaturedBlogCard({ data }: FeaturedBlogProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data || !cardRef.current) return;

    gsap.set(cardRef.current, { y: 30, opacity: 0 });

    gsap.to(cardRef.current, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power4.out",
      delay: 0.5,
    });
  }, [data]);

  if (!data) return null;

  return (
    <article className="featured-card" ref={cardRef}>
      <div className="card-image">
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
  );
}