import { client } from "./../../sanity/client";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "../../components/blog/PortableTextComponents";
import Navbar from "./../../components/Navbar";
import Footer from "./../../components/Footer";
import Link from "next/link";
import "./pageBlog.css";

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

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await client.fetch(POST_QUERY, { slug });

  if (!post) return <div className="min-h-screen bg-black" />;

  const getDelay = (index: number) => ({ animationDelay: `${0.2 + index * 0.1}s` });

  return (
    <main className="bg-black text-white min-h-screen selection:bg-orange-500">
      <Navbar />

      <article className="max-w-[var(--container-width)] mx-auto pt-32 pb-32">
        
      <div className="back-link-container">
        <Link href="/" className="back-link">
          ← GO BACK
        </Link>
      </div>

        <header className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 border-t border-white/10 pt-10 mb-20 px-6 md:px-[var(--container-padding)]">
          <div>
            <h1 className="blog-post-title">
              <span className="block overflow-hidden">
                <span className="line-inner block animate-hero-reveal" style={getDelay(0)}>
                  {post.title}
                </span>
              </span>
            </h1>
          </div>

          <div>
            {post.subtitle && (
          <h2 className="blog-post-subtitle">
            <span className="block overflow-hidden">
              <span className="line-inner block animate-hero-reveal" style={getDelay(1)}>
                {post.subtitle}
              </span>
            </span>
          </h2>
            )}
            {post.excerpt && (
              <p className="t-excerpt">
                <span className="block overflow-hidden">
                  <span className="line-inner block animate-hero-reveal" style={getDelay(2)}>
                    {post.excerpt}
                  </span>
                </span>
              </p>
            )}
          </div>
        </header>

        <div className="w-full mb-20 md:mb-32 block overflow-hidden">
          <div className="w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-zinc-900 border-y md:border border-white/10 md:rounded-sm animate-hero-reveal" style={getDelay(3)}>
            <img 
              src={post.image} 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out hover:scale-105" 
              alt={post.title} 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 px-6 md:px-0">
          <div className="md:col-start-4 md:col-span-6">
            <PortableText value={post.body} components={portableTextComponents} />
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}