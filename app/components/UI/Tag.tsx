"use client";

import "./Tag.css";

type Props = {
  labels: string | string[];
  variant?: "dark" | "light";
};

export default function Tag({ labels, variant = "dark" }: Props) {
  const items = Array.isArray(labels) ? labels : [labels];

  return (
    <div className="tag-group">
      {items.map((label, i) => (
        <span key={`${label}-${i}`} className={`tag tag--${variant} mono`}>
          {label}
        </span>
      ))}
    </div>
  );
}