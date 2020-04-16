import { InventoryStore } from '../../store';

import globalEnv from 'src/globalEnv';

interface Photo {
  original: string;
  thumbnail: string;
}

class GalleryViewModel {
  private store: InventoryStore;
  readonly defaultImage: string = `${globalEnv.CDN_URL}/static-rebrand/img/error/no_image.jpg`;
  readonly defaultThumbnail: string = `${globalEnv.CDN_URL}/static-rebrand/img/error/no_image_thumb.jpg`;
  readonly indexSeparator: string = ' of ';

  constructor(inventoryStore: InventoryStore) {
    this.store = inventoryStore;
  }

  getImages(): Photo[] {
    const {
      leadFlagPhotoUrl,
      otherPhotos = [],
      interiorPhotoUrl,
    } = this.store.vehicle._source;

    const vehiclePhotos = [leadFlagPhotoUrl, ...otherPhotos];
    const interiorPhotoIndex = vehiclePhotos.indexOf(interiorPhotoUrl);
    vehiclePhotos.splice(1, 0, vehiclePhotos.splice(interiorPhotoIndex, 1)[0]);

    return vehiclePhotos.map(img => {
      return {
        original: this.getHiResImageUrl(img) || this.defaultImage,
        thumbnail: img || this.defaultThumbnail,
      };
    });
  }

  private getHiResImageUrl(img: string): string {
    const vroomImageURL = img.includes('vroomcdn');
    if (vroomImageURL) {
      const parts = img.split('/');
      parts.push(parts[parts.length - 1]);
      parts[parts.length - 2] = 'hr';
      return parts.join('/');
    } else {
      //Fyusion Image
      const fyusionImgURL = img.replace('/edit/', '/');
      return fyusionImgURL.split('?')[0];
    }
  }
}

export default GalleryViewModel;
