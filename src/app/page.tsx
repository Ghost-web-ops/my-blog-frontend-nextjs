// src/app/page.tsx

import PostCard from "./components/PostCard";
import { Post } from "./interfaces";
import Link from "next/link";

async function getPosts() {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

  try {
    const res = await fetch(`${strapiUrl}/api/posts?populate=*`, { cache: 'no-store' });

    if (!res.ok) {
      console.error("Failed to fetch posts, status:", res.status);
      throw new Error("Failed to fetch posts");
    }

    const responseJson = await res.json();
    
    // --- خطوة تشخيص هامة ---
    // هذا السطر سيطبع شكل البيانات في سجلات Vercel لنراها
    console.log("Strapi Response JSON:", JSON.stringify(responseJson, null, 2));

    // نتأكد أن البيانات موجودة وأنها عبارة عن مصفوفة
    if (responseJson && Array.isArray(responseJson.data)) {
      return responseJson.data as Post[];
    }

    // إذا لم تكن البيانات بالشكل المتوقع، نرجع مصفوفة فارغة
    return [];

  } catch (error) {
    console.error("An error occurred in getPosts:", error);
    // في حالة حدوث أي خطأ، نرجع مصفوفة فارغة لتجنب توقف الموقع
    return [];
  }
}


export default async function Home() {
  const posts = await getPosts();

  return (
    // ١. أضف relative و min-h-screen هنا
    <main className="relative min-h-screen container mx-auto px-4 py-8 md:py-12">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold">
          Blog
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24"> {/* ٢. أضف padding-bottom */}
        {posts && posts.length > 0 ? (
          posts.filter(post => post && post.attributes).map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            There are no posts available at the moment.
          </p>
        )}
      </div>

      {/* --- ٣. إضافة قسم الزرار الثابت هنا --- */}
      <div className="sticky bottom-0 left-0 right-0 w-full flex justify-center py-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <Link 
          href="https://my-blog-backend-production-b97d.up.railway.app/admin/content-manager/collection-types/api::post.post/create" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
        >
          create new post
        </Link>
      </div>
    </main>
  );
}