export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Post } from "../../interfaces"; // لو عندك interface في src/interfaces.ts

type RichTextBlock = {
  children?: { text?: string }[];
};

function extractTextFromContent(content: RichTextBlock[]): string {
  return content
    .map((block) =>
      block.children?.map((child) => child.text || "").join(" ") ?? ""
    )
    .join("\n\n");
}

async function getPost(slug: string) {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const res = await fetch(
    `${strapiUrl}/api/posts?filters[slug][$eq]=${slug}&populate=*`
  );
  if (!res.ok) throw new Error("Failed to fetch post");
  const responseJson = await res.json();
  if (responseJson.data.length === 0) notFound();
  return responseJson.data[0] as Post;
}

// ✅ لاحظ: لا تكتب Props كـ Type خارجي. Next.js يولّد الأنواع تلقائيًا
// src/app/posts/[slug]/page.tsx

// ... (imports and other functions remain the same) ...

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await getPost(slug); // post is { id: number, attributes: { ... } }

  // ✅ Corrected paths
  const postAttributes = post.attributes;
  const coverImageUrl = postAttributes.coverImage?.data?.attributes?.url;

  return (
    <article className="container mx-auto px-4 py-8 md:py-12">
      {coverImageUrl && (
        <div className="relative w-full h-64 md:h-96 mb-8">
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${coverImageUrl}`}
            alt={postAttributes.title} // ✅ Corrected
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}
      <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-4">
        {postAttributes.title} {/* ✅ Corrected */}
      </h1>
      <p className="text-center text-gray-500 mb-12">
        Published on: {new Date(postAttributes.createdAt).toLocaleDateString('en-US')} {/* ✅ Corrected */}
      </p>
      <div className="prose lg:prose-xl max-w-none">
        <ReactMarkdown>{extractTextFromContent(postAttributes.content)}</ReactMarkdown> {/* ✅ Corrected */}
      </div>
    </article>
  );
}