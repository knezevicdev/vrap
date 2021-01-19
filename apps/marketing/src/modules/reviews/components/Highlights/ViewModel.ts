import { ContextState, Highlight } from '../../ReviewsContext';

class HighlightsViewModel {
  private highlights: Highlight[] | null;
  readonly seeAll = `SEE ALL`;
  readonly seeLess = `SEE LESS`;

  constructor(store: ContextState) {
    this.highlights = store.highlights;
  }

  getHighlights = (): Highlight[] | null => this.highlights;
}

export const getResizedImgSrc = (src: string): string => {
  const imgSrc = src.replace(/w=[0-9]{2,3}/, 'w=300');
  return imgSrc.replace(/h=[0-9]{2,3}/, 'h=300');
};

export default HighlightsViewModel;
