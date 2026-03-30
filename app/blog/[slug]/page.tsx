import { client } from "./../../sanity/client";
import { PortableText } from "@portabletext/react";
import Navbar from "./../../components/Navbar";
import Footer from "./../../components/Footer";
import Link from "next/link";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  title,
  subtitle,
  excerpt,
  publishedAt,
  "image": image.asset->url,
  "categories": coalesce(categories[]->title, []),
  body[]{
    ...,
    _type == "image" => { ..., "url": asset->url }
  }
}`;

const portableTextComponents = {
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold text-white">{children}</strong>,
    underline: ({ children }: any) => <span className="underline decoration-1 underline-offset-4 decoration-white/40">{children}</span>,
    link: ({ children, value }: any) => (
      <a href={value.href} className="underline decoration-orange-500 hover:text-orange-500 transition-colors">
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: any) => (
      <figure className={`my-16 md:my-24 ${value.fullWidth ? 'w-screen ml-[50%] -translate-x-1/2' : 'px-6 md:px-0'}`}>
        <img src={value.url} alt="Blog content" className="w-full rounded-sm border border-white/10" />
        {value.caption && (
          <figcaption className="mono text-[10px] opacity-40 mt-4 uppercase text-center tracking-widest px-6">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    customQuote: ({ value }: any) => (
      <div className="my-20 py-12 border-t border-b border-white/10 px-6 md:px-0">
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
    h2: ({ children }: any) => <h2 className="text-[32px] md:text-[40px] font-semibold text-white mt-20 mb-8 tracking-tighter leading-none px-6 md:px-0">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-[22px] md:text-[26px] font-semibold leading-tight tracking-tight text-white mb-6">{children}</h3>,
    normal: ({ children }: any) => <p className="mb-8 text-white/60 text-[15px] md:text-[17px] leading-relaxed font-normal px-6 md:px-0 max-w-prose">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="my-16 border-l border-white/30 pl-8 italic text-2xl text-white/90 leading-snug mx-6 md:mx-0">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-none space-y-4 mb-10 px-6 md:px-0">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="flex items-start text-white/60 text-[15px] md:text-[16px] before:content-['•'] before:mr-4 before:text-white/30">
        {children}
      </li>
    ),
  },
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await client.fetch(POST_QUERY, { slug });

  if (!post) return <div className="min-h-screen bg-black" />;

  return (
    <main className="bg-black text-white min-h-screen selection:bg-orange-500">
      <Navbar />

      <article className="max-w-[var(--container-width)] mx-auto px-0 md:px-[var(--container-padding)] pt-32 pb-32">
        
        <div className="px-6 md:px-0 mb-12">
          <Link href="/" className="mono text-[10px] uppercase  hover:opacity-100 transition-opacity tracking-[0.2em]">
            ← GO BACK
          </Link>
        </div>

        <header className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 border-t border-white/10 pt-10 mb-20 px-6 md:px-0">
          <div className="flex flex-col">
            <h1 className="text-[40px] md:text-[52px] font-semibold leading-[90%] md:leading-[95%] tracking-[-0.04em]">
              {post.title}
            </h1>
          </div>

          <div className="flex flex-col">
            {post.subtitle && (
              <h2 className="text-[22px] md:text-[26px] font-semibold leading-tight tracking-tight text-white mb-6">
                {post.subtitle}
              </h2>
            )}
            {post.excerpt && (
              <p className="text-[14px] md:text-[16px] text-white/70 leading-relaxed font-normal">
                {post.excerpt}
              </p>
            )}
          </div>
        </header>

        <div className="w-full mb-20 md:mb-32">
          <div className="w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-zinc-900 border-y md:border border-white/10 md:rounded-sm">
            <img 
              src={post.image} 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out hover:scale-105" 
              alt={post.title} 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-start-4 md:col-span-6">
            <PortableText value={post.body} components={portableTextComponents} />
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}