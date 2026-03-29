import { client } from "./sanity/client";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FeaturedBlogCard from "./components/FeaturedBlogCard";
import Blog from "./components/Blog";
import HeroTitle from "./components/HeroTitle";
import Image from "next/image";

export const dynamic = "force-dynamic";

async function getData() {
  const footerQuery = `*[_type == "footer"][0]{
    backgroundImage,
    sections[]{ title, links[]{ label, href } }
  }`;
  
  const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
    "id": _id,
    "date": publishedAt,
    title,
    "categories": coalesce(categories[]->title, []),
    "slug": slug.current,
    "image": image.asset->url
  }`;

  const categoriesQuery = `*[_type == "category" && defined(title)].title`;

  const [footerData, posts, allCategories] = await Promise.all([
    client.fetch(footerQuery),
    client.fetch(postsQuery),
    client.fetch(categoriesQuery),
  ]);

  return { footerData, posts, allCategories };
}

export default async function Home() {
  const { footerData, posts, allCategories } = await getData();

  return (
    <main>
      <section className="hero">
        <Image
          src="/bg-hero.webp"
          alt="Hero Background"
          fill
          priority
          quality={65}
          className="hero-bg-image"
          sizes="100vw"
          style={{ 
          objectFit: 'cover', 
          objectPosition: 'center -200%',
          // transform: 'scale(1)',   
          transformOrigin: 'bottom center',     
        }}
        />
        <Navbar />
        <div className="container">
          <HeroTitle />
          <FeaturedBlogCard />
        </div>
      </section>

      <div>
        <Blog 
          initialPosts={posts || []} 
          categoriesFromSanity={allCategories || []} 
        />      
        <Footer/>
      </div>
    </main>
  );
}