// src/app/posts/[slug]/page.tsx

import { Post } from '../../interfaces';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

// واجهة للمحتوى النصي (يجب أن تكون متطابقة مع الموجودة في interfaces.ts)
interface RichTextChild {
  type: 'text';
  text: string;
  bold?: boolean;
}
interface RichTextBlock {
  type: 'paragraph';
  children: RichTextChild[];
}

// دالة لاستخلاص النص من المحتوى
function extractTextFromContent(content: RichTextBlock[]): string {
  if (!Array.isArray(content)) return "";
  return content
    .map((block) =>
      block.children?.map((child) => child.text || "").join("") ?? ""
    )
    .join("\n\n");
}

// دالة لجلب مقال واحد بناءً على الـ slug
async function getPost(slug: string): Promise<Post | null> {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  if (!strapiUrl) return null;

  try {
    // نستخدم الفلاتر لجلب المقال المطلوب
    const res = await fetch(`${strapiUrl}/api/posts?filters[slug][$eq]=${slug}&populate=*`, {
      next: { revalidate: 60 }
    });

    if (!res.ok) return null;

    const responseJson = await res.json();
    
    // إذا وجدنا بيانات، نرجع المقال الأول
    if (responseJson && Array.isArray(responseJson.data) && responseJson.data.length > 0) {
      return responseJson.data[0];
    }

    return null;

  } catch (error) {
    //  ✅ تم تعديل هذا الجزء للتعامل مع الخطأ بشكل آمن
    if (error instanceof Error) {
      console.error("An error occurred in getPosts fetch:", error.message);
    } else {
      console.error("An unknown error occurred in getPosts fetch:", error);
    }
    return null;
  }
}

// تعريف خصائص الصفحة
type PageProps = {
  params: {
    slug: string;
  };
};

// مكون الصفحة
export default async function PostPage({ params }: PageProps) {
  const { slug } = params;
  const post = await getPost(slug);

  // إذا لم يتم العثور على المقال، نعرض صفحة 404
  if (!post) {
    notFound();
  }

  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const coverImageUrl = post.coverImge && post.coverImge.length > 0
    ? post.coverImge[0].url
    : null;

  return (
    <article className="container mx-auto px-4 py-8 md:py-12">
      {coverImageUrl && (
        <div className="relative w-full h-64 md:h-96 mb-8">
          <Image
            src={`${strapiUrl}${coverImageUrl}`}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}
      <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-4">
        {post.title}
      </h1>
      <p className="text-center text-gray-500 mb-12">
        Published on: {new Date(post.publishedAt).toLocaleDateString('en-US')}
      </p>
      <div className="prose lg:prose-xl max-w-none mx-auto">
        <ReactMarkdown>{extractTextFromContent(post.content)}</ReactMarkdown>
      </div>
    </article>
  );
}