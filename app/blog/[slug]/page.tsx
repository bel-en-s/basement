import { client } from "./../../sanity/client"; 
import { PortableText } from "@portabletext/react";
import Navbar from "./../../components/Navbar";
import Footer from "./../../components/Footer";
import Link from "next/link";



const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  title,
  publishedAt,
  "image": image.asset->url,
  "categories": categories[]->title,
  body[]{
    ...,
    _type == "image" => { ..., "url": asset->url }
  }
}`;

export default async function PostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> // En versiones nuevas de Next.js, params es una Promise
}) {
  
  // 2. IMPORTANTE: Hacemos await de los params primero
  const { slug } = await params;

  // 3. Pasamos el slug como segundo argumento en un objeto
  const post = await client.fetch(POST_QUERY, { slug: slug });

  if (!post) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Post no encontrado</div>;
  }

  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />
      
      <article className="container-main pt-32 pb-20">
        <header className="flex flex-col md:flex-row justify-between items-start mb-16 border-t border-white/10 pt-8">
          <div className="max-w-3xl">
            <Link href="/" className="mono text-xs uppercase opacity-50 hover:opacity-100 mb-8 block">
              ← Go Back
            </Link>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.85]">
              {post.title}
            </h1>
          </div>
          
          <div className="text-right mt-8 md:mt-16">
            <p className="mono text-xs opacity-50 uppercase mb-2">
              {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                month: 'short', day: 'numeric', year: 'numeric' 
              })}
            </p>
            <p className="mono text-xs uppercase">
              {post.categories?.join(" / ")}
            </p>
          </div>
        </header>

        <div className="w-full aspect-video overflow-hidden mb-24">
          <img src={post.image} className="w-full h-full object-cover" alt={post.title} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-start-5 md:col-span-7">
            <div className="prose-custom text-gray-400 text-lg leading-relaxed">
              <PortableText value={post.body} components={portableTextComponents} />
            </div>
          </div>
        </div>
      </article>

      {/* <Footer data={footerData} /> */}
    </main>
  );
}

// Componentes para PortableText (los mismos de antes)
const portableTextComponents = {
  types: {
    image: ({ value }: any) => <img src={value.url} alt="Content" className="my-12 w-full" />,
  },
  block: {
    h2: ({ children }: any) => <h2 className="text-3xl font-bold text-white mt-16 mb-6 uppercase tracking-tight">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl mono text-white mt-10 mb-4 uppercase">{children}</h3>,
    normal: ({ children }: any) => <p className="mb-6">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="my-16 border-l-2 border-white pl-8 font-serif italic text-3xl md:text-5xl text-white">
        {children}
      </blockquote>
    ),
  },
};