"use client";

import React, { useState } from "react";
import BlogCard from "./UI/BlogCard";
import { CATEGORIES, Category } from "./UI/Tag";
import "./Blog.css";

const CATEGORY_LIST: Category[] = Object.values(CATEGORIES);

const POSTS: {
  id: number;
  date: string;
  title: string;
  category: Category;
  image: string;
}[] = [
  {
    id: 1,
    date: "Dec 3, 2025",
    title: "Shipping Ship...",
    category: CATEGORIES.DEV,
    image: "/post1.jpg",
  },
  {
    id: 2,
    date: "Feb 12, 2025",
    title: "New Digital HQ",
    category: CATEGORIES.WEB,
    image: "/post2.jpg",
  },
];

export default function Blog() {
  const [activeFilter, setActiveFilter] = useState<Category>(CATEGORIES.ALL);

  const filteredPosts = POSTS.filter((post) => {
    if (activeFilter === CATEGORIES.ALL) return true;
    return post.category === activeFilter;
  });

  return (
    <section className="blog-section">
      <div className="container-main">
        <h2 className="blog-heading h1">
          Knowledge Is Meant <br /> to Be Shared
        </h2>

        <nav className="blog-filters">
          {CATEGORY_LIST.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`filter-btn mono ${
                activeFilter === cat ? "active" : ""
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>

        <div className="blog-grid">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} {...post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <p className="no-results mono">
            No posts found in this category.
          </p>
        )}

        <div className="blog-load-more">
          <button className="load-more-btn ui">LOAD MORE</button>
        </div>
      </div>
    </section>
  );
}