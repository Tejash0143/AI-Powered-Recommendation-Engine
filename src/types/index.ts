
export interface Author {
  id: string;
  name: string;
  institution?: string;
}

export interface Paper {
  id: string;
  title: string;
  authors: Author[];
  abstract: string;
  publishDate: string;
  conference?: string;
  journal?: string;
  citations: number;
  tags: string[];
  url: string;
  imageUrl?: string;
  arxivId?: string;
  pdfUrl?: string;
  primaryCategory?: string;
}

export type FilterOption = {
  id: string;
  label: string;
}

export type FilterCategory = {
  id: string;
  name: string;
  options: FilterOption[];
}

export interface ArxivAuthor {
  name: string;
}

export interface ArxivEntry {
  id: string;
  title: string;
  summary: string;
  published: string;
  updated: string;
  authors: ArxivAuthor[];
  links: {
    href: string;
    title?: string;
    rel: string;
    type?: string;
  }[];
  doi?: string;
  primary_category: {
    term: string;
    scheme: string;
  };
  categories: string[];
}

export interface ArxivResponse {
  feed: {
    entry: ArxivEntry[];
  };
}
