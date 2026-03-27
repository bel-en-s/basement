import { client } from "./sanity/client";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FeaturedBlogCard from "./components/FeaturedBlogCard";
import Blog from "./components/Blog";
import HeroTitle from "./components/HeroTitle";
import Image from "next/image";

export default async function Home() {
  const posts = await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      "id": _id,
      "date": publishedAt,
      title,
      "categories": coalesce(categories[]->title, []),
      "slug": slug.current,
      "image": image.asset->url
    }
  `);

  const allCategories = await client.fetch(`
    *[_type == "category" && defined(title)].title
  `);

  return (
    <main className="hero">
      <Image
        src="/bg-hero.webp"
        alt="Hero Background"
        width={100}
        height={100}
        priority
        className="hero-bg"
      />
      <Navbar />
      <div className="hero-inner container-main">
        <HeroTitle />
        <FeaturedBlogCard />
      </div>
      <Blog initialPosts={posts || []} categoriesFromSanity={allCategories || []} />      
      <Footer />
    </main>
  );
}