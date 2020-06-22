import { action, observable } from 'mobx';
import { createContext } from 'react';

export enum GallerySelections {
  GENERAL = 'GENERAL PHOTOS',
  DEFECTS = 'IMPERFECTIONS',
  THREESIXTY = '360',
}

export class GalleryStore {
  @observable selectedGallery: GallerySelections = GallerySelections.GENERAL;

  @action
  changeSelectedGallery = (gallery: GallerySelections): void => {
    this.selectedGallery = gallery;
  };
}

export const GalleryStoreContext = createContext<GalleryStore>(
  new GalleryStore()
);
