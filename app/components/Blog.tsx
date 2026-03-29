"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import BlogCard from "./UI/BlogCard";
import "./Blog.css";
import MainButton from "./UI/MainButton";



if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SanityPost {
  id: string;
  date: string;
  title: string;
  categories: string[];
  slug: string;
  image: string;
}

interface BlogProps {
  initialPosts: SanityPost[];
  categoriesFromSanity: string[];
}

export default function Blog({ initialPosts, categoriesFromSanity }: BlogProps) {
  const ALL_POSTS = "all posts";
  const filterTabs = [ALL_POSTS, ...new Set(categoriesFromSanity)];
  const [activeFilter, setActiveFilter] = useState(ALL_POSTS);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll(".reveal-item");
      if (items) {
        gsap.fromTo(
          items,
          { y: 60, opacity: 0, filter: "blur(5px)" },
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

  useEffect(() => {
    const cards = document.querySelectorAll(".blog-card-wrapper");
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power2.out" }
      );
    }
  }, [activeFilter]);

  const filteredPosts = initialPosts.filter((post) => {
    if (activeFilter.toLowerCase() === ALL_POSTS) return true;
    const postCats = post.categories || [];
    return postCats.some(
      (cat) => cat.trim().toLowerCase() === activeFilter.trim().toLowerCase()
    );
  });

  return (
    <section ref={sectionRef} className="blog-section">
      <div className="container">
        <h2 className="blog-heading reveal-item">
          Knowledge Is Meant <br /> to Be Shared
        </h2>

        <nav className="blog-filters reveal-item">
          {filterTabs.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`filter-btn mono ${
                activeFilter.trim().toLowerCase() === cat.trim().toLowerCase() ? "active" : ""
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>

        <div className="blog-grid reveal-item">
          {filteredPosts.map((post) => (
            <div key={post.id} className="blog-card-wrapper">
               <BlogCard 
                  image={post.image}
                  date={post.date ? new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  }) : "No date"}
                  title={post.title}
                  slug={post.slug}
                  category={post.categories}
               />
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <p className="no-results mono reveal-item">
            no posts found in this category.
          </p>
        )}

        {filteredPosts.length > 0 && (
          <div className="blog-load-more reveal-item">
            <MainButton text="Load More" />
          </div>
        )}
      </div>
    </section>
  );
}