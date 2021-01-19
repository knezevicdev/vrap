import { createContext } from 'react';

export interface Summary {
  averageRating: number;
  totalNumReviews: number;
}
export interface Highlight {
  comment: string;
  date: string;
  rating: number;
  reviewCompanyIconSrc: string;
  reviewerName: string;
}
export interface ContextState {
  summary: Summary | null;
  highlights: Highlight[] | null;
}

export const ReviewsContext = createContext<ContextState | null>(null);
