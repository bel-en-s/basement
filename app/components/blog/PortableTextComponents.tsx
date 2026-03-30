import { PortableTextComponents } from "@portabletext/react";

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
        <img src={value.url} alt="Blog content" className="w-full rounded-sm border border-white/10" />
        {value.caption && (
          <figcaption className="mono text-[10px] opacity-40 mt-4 uppercase text-center tracking-widest px-6">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    customQuote: ({ value }) => (
      <div className="my-20 py-12 border-y border-white/10">
        <blockquote className="text-[32px] md:text-[48px] font-medium tracking-tighter text-white mb-8 leading-[1.1]">
          “{value.text}”
        </blockquote>
        {(value.author || value.role) && (
          <cite className="not-italic block">
            <span className="mono text-[11px] uppercase text-white block tracking-widest">{value.author}</span>
            <span className="mono text-[10px] uppercase text-white/40 block tracking-widest mt-1">{value.role}</span>
          </cite>
        )}
      </div>
    ),
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-[32px] md:text-[40px] font-semibold text-white mt-20 mb-8 tracking-tighter leading-none">
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
    blockquote: ({ children }) => (
      <blockquote className="my-16 border-l border-white/30 pl-8 italic text-2xl text-white leading-snug">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-none space-y-4 mb-10">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-4 text-white">
        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white opacity" />
        <span>{children}</span>
      </li>
    ),
  },
};