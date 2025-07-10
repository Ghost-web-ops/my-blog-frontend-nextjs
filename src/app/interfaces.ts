interface RichTextChild {
  type: string;
  text?: string;
}

interface RichTextBlock {
  type: string;
  children?: RichTextChild[];
}

export interface Post {
  id: number;
  title: string;
  content: RichTextBlock[];
  slug: string;
  summary: string;
  createdAt: string;
  coverImage: StrapiMediaData;
}

export interface StrapiMediaData {
  id: number;
  attributes: {
    url: string;
    alternativeText?: string;
    caption?: string;
  };
  data: StrapiMedia | null;
}

interface StrapiMedia {
  id: number;
  attributes: {
    name: string;
    url: string;
    width: number;
    height: number;
  };
}