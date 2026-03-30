//acomodar imagen hero mobile
//gsap entrance animation repeat

import { client } from "./sanity/client";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FeaturedBlogCard from "./components/FeaturedBlogCard";
import Blog from "./components/Blog";
import HeroTitle from "./components/HeroTitle";
import Image from "next/image";

export const dynamic = "force-dynamic";

async function getData() {

  //footer queria hacerlo modular también pero no me dio el tiempo
  const footerQuery = `*[_type == "footer"][0]{
    backgroundImage,
    sections[]{ title, links[]{ label, href } }
  }`;
const postsQuery = `*[_type == "post"] | order(order asc) {
  "id": _id,
  "date": publishedAt,
  title,
  order, 
  featured,
  "categories": coalesce(categories[]->title, []),
  "slug": slug.current,
  "image": image.asset->url,
  "description": array::join(body[0].children[].text, "") 
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
  const { posts, allCategories } = await getData();

  const featuredPost = posts?.find((post: any) => post.featured === true);

  return (
    <main>
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
            objectPosition: '5% 50%',
     
          }}
        />
      <section className="hero" style={{ position: 'relative', minHeight: '100vh' }}>
  
        <Navbar />
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <HeroTitle />
          {featuredPost && <FeaturedBlogCard data={featuredPost} />}
        </div>
      </section>

      <div>
        <Blog 
          initialPosts={posts || []} 
          categoriesFromSanity={allCategories || []} 
        />      
        <Footer />
      </div>
    </main>
  );
}