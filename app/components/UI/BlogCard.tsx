"use client";

import Link from "next/link";
import Tag from "./Tag";
import SecondaryButton from "./SecondaryButton";

interface BlogCardProps {
  id?: string;
  image?: string;
  date: string;
  title: string;
  category: string[];
  slug: string;
}

export default function BlogCard({
  image,
  date,
  title,
  category,
  slug,
}: BlogCardProps) {
  const showImage = image && image !== "" && !image.includes("placeholder");

  // formateo de fecha
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className={`blog-card ${!showImage ? "no-image" : ""}`}>
      {showImage && (
        <div className="blog-card-image">
          <img className="blog-card-img" src={image} alt={title} />
        </div>
      )}

      <div className="blog-card-content">
        <div className="blog-card-meta mono">
          <span>{formattedDate}</span>
        </div>

        <h3 className="blog-card-title">{title}</h3>
        
        {category && category.length > 0 && (
          <div className="blog-card-tags">
            <Tag labels={category} variant="light" />
          </div>
        )}
        
        <div className="blog-card-footer">
   
          <Link href={`/blog/${slug}`} className="inline-block">
            <SecondaryButton text="Read More" variant="white" />
          </Link>
        </div>
      </div>
    </article>
  );
}