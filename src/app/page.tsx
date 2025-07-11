// src/app/page.tsx

import PostCard from "./components/PostCard";
import { Post } from "./interfaces";
import Link from "next/link";

async function getPosts(): Promise<Post[]> {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

  if (!strapiUrl) {
    console.error("STRAPI_API_URL is not defined.");
    return [];
  }

  try {
    //  👇 هذا هو التعديل الحاسم 👇
    const res = await fetch(`${strapiUrl}/api/posts?populate=*`, { 
      next: { revalidate: 10 } 
    });

    if (!res.ok) {
      console.error("Build-time fetch failed, status:", res.status);
      return [];
    }

    const responseJson = await res.json();
    
    if (responseJson && Array.isArray(responseJson.data)) {
      return responseJson.data;
    }

    return [];

  } catch (error) {
    console.error("An error occurred during build-time fetch:", error);
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="relative min-h-screen container mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold">
          Posts
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
        {/* ٤. تحقق آمن جدًا قبل العرض */}
        {Array.isArray(posts) && posts.length > 0 ? (
          posts
            .filter(post => post && post.attributes) // فلترة إضافية
            .map((post) => (
              <PostCard key={post.id} post={post} />
            ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-xl">
            No posts available at the moment.
          </p>
        )}
      </div>

      <div className="fixed bottom-6 right-6">
        <Link 
          href="https://my-blog-backend-production-b97d.up.railway.app/admin/content-manager/collection-types/api::post.post/create" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-blue-600 text-white font-bold p-4 rounded-full hover:bg-blue-700 transition-colors shadow-lg flex items-center justify-center"
          aria-label="Add new post"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </Link>
      </div>
    </main>
  );
}