import { GallerySelections, GalleryStore } from '../../store';

class GallerySelectorViewModel {
  private store: GalleryStore;
  readonly general: string = GallerySelections.GENERAL;
  readonly imperfections: string = GallerySelections.DEFECTS;

  constructor(galleryStore: GalleryStore) {
    this.store = galleryStore;
  }

  handleChange = (
    event: React.ChangeEvent<{}>,
    newValue: GallerySelections
  ): void => {
    event.preventDefault();
    this.store.changeSelectedGallery(newValue);
  };

  getSelectedGallery(): string {
    return this.store.selectedGallery;
  }
}

export default GallerySelectorViewModel;
