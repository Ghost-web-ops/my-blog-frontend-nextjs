import { Post } from "./interfaces";
import PostCard from "./components/PostCard";
import "./globals.css";
import { notFound } from "next/navigation";

async function getPosts() {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const res = await fetch(`${strapiUrl}/api/posts?populate=*`);
  if (!res.ok) throw new Error("Failed to fetch posts") || notFound();
  const responseJson = await res.json();
  return responseJson.data as Post[];
}
console.log("getPosts:", getPosts);

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-12">
        Blog
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (

            <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}