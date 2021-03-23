import { action, makeObservable, observable } from 'mobx';
import { createContext } from 'react';

export class GalleryStore {
  @observable isListView = false;
  @observable listViewFullscreenImage: string | undefined = undefined;

  constructor() {
    makeObservable(this);
  }

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
