"use client";

import "./Tag.css";

export const CATEGORIES = {
  ALL: "ALL POSTS",
  WEB: "WEB DESIGN",
  DEV: "DEVELOPMENT",
  BRAND: "BRANDING",
} as const;

export type Category = typeof CATEGORIES[keyof typeof CATEGORIES];

type Props = {
  labels: Category | Category[];
  variant?: "dark" | "light";
};

export default function Tag({ labels, variant = "dark" }: Props) {
  const items = Array.isArray(labels) ? labels : [labels];

  return (
    <div className="tag-group">
      {items.map((label) => (
        <span key={label} className={`tag tag--${variant}`}>
          {label}
        </span>
      ))}
    </div>
  );
}