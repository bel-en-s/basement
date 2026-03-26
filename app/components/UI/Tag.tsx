"use client";

import "./Tag.css";

export const tagCategories = {
  all: "all posts",
  web: "Web Design",
  dev: "Development",
  brand: "branding",
} as const;

export type Category =
  (typeof tagCategories)[keyof typeof tagCategories];

type Props = {
  labels: Category | Category[];
  variant?: "dark" | "light";
};

export default function Tag({ labels, variant = "dark" }: Props) {
  const items = Array.isArray(labels) ? labels : [labels];

  return (
    <div className="tag-group">
      {items.map((label, i) => (
        <span key={`${label}-${i}`} className={`tag tag--${variant}`}>
          {label}
        </span>
      ))}
    </div>
  );
}