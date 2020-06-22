import { action, observable } from 'mobx';
import { createContext } from 'react';

export enum GallerySelections {
  GENERAL = 'GENERAL PHOTOS',
  DEFECTS = 'IMPERFECTIONS',
  THREESIXTY = '360',
}

export class GalleryStore {
  @observable selectedGallery: GallerySelections = GallerySelections.GENERAL;
  @observable isListView = false;
  @observable listViewFullscreenImage: string | undefined = undefined;

  @action
  changeSelectedGallery = (gallery: GallerySelections): void => {
    this.selectedGallery = gallery;
  };

  @action
  changeListView = (): void => {
    this.isListView = !this.isListView;
  };

  @action
  setListViewFullscreen = (image?: string): void => {
    if (image) {
      this.listViewFullscreenImage = image;
    } else {
      this.listViewFullscreenImage = undefined;
    }
  };
}

export const GalleryStoreContext = createContext<GalleryStore>(
  new GalleryStore()
);
