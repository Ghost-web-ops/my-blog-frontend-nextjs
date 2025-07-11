// src/interfaces.ts

// واجهة للمحتوى النصي داخل Strapi
interface RichTextChild {
  text: string;
  type: 'text';
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

interface RichTextBlock {
  type: 'paragraph' | 'heading' | 'list' | 'quote';
  children: RichTextChild[];
  level?: number; // للـ heading
}

// واجهة لبيانات الصورة داخل Strapi
interface StrapiImageAttributes {
  url: string;
  width: number;
  height: number;
}

interface StrapiImageData {
  id: number;
  attributes: StrapiImageAttributes;
}

interface StrapiImage {
  data: StrapiImageData | null;
}

// واجهة لخصائص المقال
interface PostAttributes {
  title: string;
  slug: string;
  summary: string;
  content: RichTextBlock[]; //  <- تم استبدال any[] بتعريف دقيق
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  coverImage: StrapiImage;
}

// الواجهة النهائية للمقال كما تأتي من الـ API
export interface Post {
  id: number;
  attributes: PostAttributes;
}