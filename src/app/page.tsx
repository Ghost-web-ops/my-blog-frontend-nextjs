// src/app/page.tsx

import PostCard from "./components/PostCard";
import { Post } from "./interfaces";
import Link from "next/link";

// src/app/page.tsx

async function getPosts(): Promise<Post[]> {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  
  // سنطبع الرابط للتأكد منه في السجلات
  console.log("1. Attempting to fetch from URL:", strapiUrl);

  const res = await fetch(`${strapiUrl}/api/posts?populate=*`);

  // إذا فشل الاتصال، سنوقف عملية النشر ونعرض الخطأ
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`CRITICAL ERROR: Failed to fetch. Status: ${res.status}. Response: ${errorText}`);
  }

  const responseJson = await res.json();
  console.log("2. Received JSON response.");

  // إذا كانت البيانات ليست بالشكل المتوقع، سنوقف عملية النشر ونعرض الخطأ
  if (!responseJson || !Array.isArray(responseJson.data)) {
    throw new Error(`CRITICAL ERROR: Data structure is not an array. Received: ${JSON.stringify(responseJson)}`);
  }
  
  console.log(`3. Success! Fetched ${responseJson.data.length} posts.`);
  return responseJson.data;
}
// src/app/page.tsx

export default async function Home() {
  // سنزيل التحقق من هنا لنعتمد على الكود الجديد
  const posts = await getPosts();

  return (
    <main className="relative min-h-screen container mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold">
          Posts
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
        {/* لا نحتاج للتحقق هنا لأن الخطأ سيوقف النشر قبل الوصول لهذه النقطة */}
        {posts.map((post) => (
            <PostCard key={post.id} post={post} />
        ))}
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