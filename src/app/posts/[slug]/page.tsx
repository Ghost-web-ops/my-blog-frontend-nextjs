// src/app/posts/[slug]/page.tsx

import { Post, RichTextBlock, RichTextChild } from '../../interfaces';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

async function getPost(slug: string): Promise<Post | null> {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  if (!strapiUrl) return null;

  try {
    const res = await fetch(`${strapiUrl}/api/posts?filters[slug][$eq]=${slug}&populate=*`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return null;
    const responseJson = await res.json();
    return (responseJson.data && responseJson.data.length > 0) ? responseJson.data[0] : null;
  } catch (error) {
    // ✅ تم استخدام المتغير error هنا لحل المشكلة
    if (error instanceof Error) {
      console.error(`Error fetching post for slug ${slug}:`, error.message);
    }
    return null;
  }
}

// دالة لتحويل محتوى المقال إلى نص عادي مع أنواع دقيقة
function extractTextFromContent(content: RichTextBlock[]): string {
  if (!Array.isArray(content)) return "";
  return content
    .map((block) => block.children?.map((child: RichTextChild) => child.text || "").join("") ?? "")
    .join("\n\n");
}

type PageProps = { params: { slug: string; }; };

export default async function PostPage({ params }: PageProps) {
  const post = await getPost(params.slug);

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
        Published on: {new Date(post.publishedAt).toLocaleDateString()}
      </p>
      <div className="prose lg:prose-xl max-w-none mx-auto">
        <ReactMarkdown>{extractTextFromContent(post.content)}</ReactMarkdown>
      </div>
    </article>
  );
}