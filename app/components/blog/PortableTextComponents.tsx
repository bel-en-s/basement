import { PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import "./PortableTextComponents.css"

export const portableTextComponents: PortableTextComponents = {
//   marks: {
//     strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
//     underline: ({ children }) => (
//       <span className="underline decoration-1 underline-offset-4 decoration-white/40">
//         {children}
//       </span>
//     ),
//     link: ({ children, value }) => (
//       <a 
//         href={value.href} 
//         className="underline decoration-orange-500 hover:text-orange-500 transition-colors"
//       >
//         {children}
//       </a>
//     ),
//   },
  types: {
    image: ({ value }) => (
      <figure className={`my-16 md:my-24 ${value.fullWidth ? 'w-screen ml-[50%] -translate-x-1/2' : ''}`}>
        <div className="relative aspect-video w-full overflow-hidden rounded-sm border border-white/10">
          <Image 
            src={value.url} 
            alt={value.caption || "Blog content"} 
            fill 
            className="object-cover"
          />
        </div>
        {value.caption && (
          <figcaption className="text-mono text-[10px] opacity-40 mt-4 uppercase text-center tracking-widest px-6">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    customQuote: ({ value }) => (
      <div className="my-20 py-12 ">
       <div className="blog-post-quote-container">
  <blockquote className="blog-post-quote-text">
    “{value.text}”
  </blockquote>
</div>
            <cite className="blog-post-quote-cite">
            <span className="author">{value.author}</span>
            <span className="role">/ {value.role}</span>
            </cite>
      </div>
    ),
    sideQuote: ({ value }) => (
      <blockquote className="my-12 border-l border-white/30 pl-8 max-w-prose">
       <div className="blog-post-side-quote-content">
        <span className="text-white">“{value.quote}”</span>
        <cite className="not-italic inline-flex items-baseline gap-x-1.5 ml-2">
            <span className="text-author">— {value.author}</span>
            {value.role && (
            <span className="text-role">/ {value.role}</span>
            )}
        </cite>
        </div>
      </blockquote>
    ),
  },
  block: {
    h2: ({ children }) => (
    <h2 className="blog-post-h2">
    {children}
    </h2>
    ),
    h3: ({ children }) => (
      <h3 className="blog-post-h3">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="blog-post-p">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-none space-y-4 mb-10">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-4 text-white">
        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
        <span className="t-body">{children}</span>
      </li>
    ),
  },
};