// src/interfaces.ts

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
  content: any[]; // يمكنك تحديد نوع أكثر دقة للمحتوى إذا أردت
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