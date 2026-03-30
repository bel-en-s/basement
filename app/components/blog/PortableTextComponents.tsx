import { PortableTextComponents } from "@portabletext/react";
import Image from "next/image";

export const portableTextComponents: PortableTextComponents = {
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
    underline: ({ children }) => (
      <span className="underline decoration-1 underline-offset-4 decoration-white/40">
        {children}
      </span>
    ),
    link: ({ children, value }) => (
      <a 
        href={value.href} 
        className="underline decoration-orange-500 hover:text-orange-500 transition-colors"
      >
        {children}
      </a>
    ),
  },
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
      <div className="my-20 py-12 border-y border-white/10 text-center md:text-left">
        <blockquote className="text-[32px] md:text-[48px] font-medium tracking-tighter text-white mb-8 leading-[1.1]">
          “{value.text}”
        </blockquote>
        <cite className="not-italic flex items-baseline gap-x-2">
          <span className="t-mono text-[11px] uppercase text-white tracking-widest">{value.author}</span>
          <span className="t-mono text-[10px] uppercase text-white/40 tracking-widest">/ {value.role}</span>
        </cite>
      </div>
    ),
    sideQuote: ({ value }) => (
      <blockquote className="my-12 border-l border-white/30 pl-8 max-w-prose">
        <div className="font-sans font-semibold text-[13px] md:text-[16px] leading-[100%] md:leading-[130%] tracking-normal">
          <span className="text-white">“{value.quote}”</span>
          <cite className="not-italic inline-flex items-baseline gap-x-1.5 ml-2">
            <span className="text-[#A1A1A1]">— {value.author}</span>
            {value.role && (
              <span className="text-[#666666]">/ {value.role}</span>
            )}
          </cite>
        </div>
      </blockquote>
    ),
  },
  block: {
    h2: ({ children }) => (
      <h2 className="t-h2 text-white mt-20 mb-8 uppercase tracking-tighter">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-[22px] md:text-[26px] font-semibold leading-tight tracking-tight text-white mb-6">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="t-body mb-8 text-white max-w-prose leading-relaxed">
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