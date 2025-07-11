export interface Post {
  id: number;
  attributes: {
    title: string;
    slug: string;
    summary: string;
    content: RichTextBlock[];
    createdAt: string;
    coverImage?: {
      data?: StrapiMedia;
    };
  };
}

export interface RichTextBlock {
  type: string;
  children?: {
    type: string;
    text?: string;
  }[];
}

export interface StrapiMedia {
  id: number;
  attributes: {
    url: string;
    alternativeText?: string;
    caption?: string;
    name: string;
    width: number;
    height: number;
  };
}
