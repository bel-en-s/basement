import React from "react";
import Tag from "./Tag";

interface BlogCardProps {
  image: string;
  date: string;
  title: string;
  category: string;
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
        <img src={image} alt={title} />
      </div>

      <div className="blog-card-content">
        <div className="blog-card-meta">
          <span className="mono">{date}</span>
        </div>

        <h3 className="blog-card-title">{title}</h3>

        <div className="blog-card-footer">
          <Tag labels={category} variant="light" />
          <button className="blog-card-more caption">READ MORE</button>
        </div>
      </div>
    </article>
  );
}