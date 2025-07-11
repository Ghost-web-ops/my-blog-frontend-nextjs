// src/interfaces.ts

interface RichTextChild {
  text: string;
  type: 'text';
  bold?: boolean;
}
interface RichTextBlock {
  type: 'paragraph';
  children: RichTextChild[];
}
interface StrapiImageAttributes {
  url: string;
}
interface StrapiImageData {
  id: number;
  attributes: StrapiImageAttributes;
}
interface StrapiImage {
  data: StrapiImageData | null;
}
interface PostAttributes {
  title: string;
  slug: string;
  summary: string;
  content: RichTextBlock[];
  createdAt: string;
  publishedAt: string;
  coverImage: StrapiImage;
}
export interface Post {
  id: number;
  attributes: PostAttributes;
}