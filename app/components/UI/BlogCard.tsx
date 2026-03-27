"use client";

import Tag from "./Tag";
import SecondaryButton from "./SecondaryButton";

interface BlogCardProps {
  id?: string;
  image: string;
  date: string;
  title: string;
  category: string | string[];
}

export default function BlogCard({
  image,
  date,
  title,
  category,
}: BlogCardProps) {
  return (
    <article className="blog-card">
      <div className="blog-card-image">
        <img className="blog-card-img" src={image} alt={title} />
      </div>

      <div className="blog-card-content">
        <div className="blog-card-meta mono">
          <span>{date}</span>
        </div>

        <h3 className="blog-card-title">{title}</h3>
        
        <div className="blog-card-tags">
          <Tag labels={category} variant="light" />
        </div>
        
        <div className="blog-card-footer">
          <SecondaryButton text="Read More" variant="white" />
        </div>
      </div>
    </article>
  );
}