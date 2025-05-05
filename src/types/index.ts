
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
