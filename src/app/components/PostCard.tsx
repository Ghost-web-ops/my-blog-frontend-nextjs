// src/app/components/PostCard.tsx

import { Post } from "../interfaces";
import Image from "next/image";
import Link from "next/link";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  
  const postAttributes = post.attributes;
  const coverImageUrl = postAttributes.coverImage?.data?.attributes?.url;

  return (
    <Link href={`/posts/${postAttributes.slug}`} className="block">
      <div className="border rounded-lg shadow overflow-hidden hover:-translate-y-1 transition-transform duration-300">
        {coverImageUrl ? (
          <div className="relative w-full h-48">
            <Image
              src={`${strapiUrl}${coverImageUrl}`}
              alt={String(postAttributes.title)}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2 truncate">{postAttributes.title}</h2>
          <p className="text-gray-600 text-sm">{postAttributes.summary}</p>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;