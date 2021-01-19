import { ContextState, Highlight } from '../../ReviewsContext';

class HighlightsViewModel {
  readonly seeAll = `SEE ALL`;
  readonly seeLess = `SEE LESS`;

  private highlights?: Highlight[];

  constructor(store: Partial<ContextState>) {
    this.highlights = store.highlights;
  }

  getHighlights(): Highlight[] | undefined {
    return this.highlights;
  }
}

export default HighlightsViewModel;

export const getResizedImgSrc = (src: string): string => {
  const imgSrc = src.replace(/w=[0-9]{2,3}/, 'w=300');
  return imgSrc.replace(/h=[0-9]{2,3}/, 'h=300');
};
