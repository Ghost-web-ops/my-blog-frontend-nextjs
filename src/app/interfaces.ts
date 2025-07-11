// src/interfaces.ts

// واجهات دقيقة للمحتوى النصي
export interface RichTextChild {
  type: 'text';
  text: string;
  bold?: boolean;
}

export interface RichTextBlock {
  type: 'paragraph';
  children: RichTextChild[];
}

// واجهات دقيقة للصور وصيغها المختلفة
export interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
}

export interface ImageFormats {
  large?: ImageFormat;
  small?: ImageFormat;
  medium?: ImageFormat;
  thumbnail?: ImageFormat;
}

export interface StrapiImage {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: ImageFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
}

// الواجهة النهائية للمقال بالشكل المسطح (بدون attributes)
export interface Post {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: RichTextBlock[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  coverImge: StrapiImage[];
}