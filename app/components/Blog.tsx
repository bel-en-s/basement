"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import BlogCard from "./UI/BlogCard";
import { tagCategories, Category } from "./UI/Tag";
import "./Blog.css";
import MainButton from "./UI/MainButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CATEGORY_LIST: Category[] = Object.values(tagCategories);

const POSTS = [
  {
    id: 1,
    date: "Dec 3, 2025",
    title: "Shipping Ship: Behind the Particle Shader Effect for Vercel’s Conf",
    category: tagCategories.dev,
    image: "/blog2.webp",
  },
  {
    id: 2,
    date: "Feb 12, 2025",
    title: "New Digital HQ",
    category: tagCategories.web,
    image: "/blog1.webp",
  },
];

export default function Blog() {
  const [activeFilter, setActiveFilter] = useState<Category>(tagCategories.all);
  const sectionRef = useRef<HTMLDivElement>(null);

  // 1. Animación de Entrada al hacer Scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll(".reveal-item");
      
      if (items) {
        gsap.fromTo(
          items,
          { 
            y: 60, 
            opacity: 0, 
            filter: "blur(5px)" 
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            stagger: 0.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 2. Animación al cambiar de Filtro
  useEffect(() => {
    gsap.fromTo(
      ".blog-card",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power2.out" }
    );
  }, [activeFilter]);

  const filteredPosts = POSTS.filter((post) => {
    if (activeFilter === tagCategories.all) return true;
    return post.category === activeFilter;
  });

  return (
    <section ref={sectionRef} className="blog-section">
      <div className="container-main">
        <h2 className="blog-heading h1 reveal-item">
          Knowledge Is Meant <br /> to Be Shared
        </h2>

        <nav className="blog-filters reveal-item">
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

        <div className="blog-grid reveal-item">
          {filteredPosts.map((post) => (
            <div key={post.id} className="blog-card-wrapper">
               <BlogCard {...post} />
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <p className="no-results mono reveal-item">
            no posts found in this category.
          </p>
        )}

        <div className="blog-load-more reveal-item">
          <MainButton text="Load More" />
        </div>
      </div>
    </section>
  );
}