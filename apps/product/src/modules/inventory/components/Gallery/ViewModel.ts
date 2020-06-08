import { isEmpty } from 'lodash';

import { GallerySelections, InventoryStore } from '../../store';

import globalEnv from 'src/globalEnv';

interface GeneralPhoto {
  original: string;
  thumbnail: string;
}

interface DefectPhoto {
  original: string;
  thumbnail: string;
  description: string;
}

class GalleryViewModel {
  private store: InventoryStore;
  readonly defaultImage = {
    alt: 'No photos',
    src: `${globalEnv.CDN_URL}/components/ghost-suv.png`,
  };
  readonly indexSeparator: string = ' of ';
  readonly photosComing: string = 'Photos Coming Soon';
  readonly stockPhotoBody: string = `These are stock photos. When real photos become available, we'll share them here.`;
  readonly noPhotosSubtitle: string =
    "When real photos become available, we'll share\xa0them\xa0here.";

  constructor(inventoryStore: InventoryStore) {
    this.store = inventoryStore;
  }

  showBanner(): boolean {
    return this.store.vehicle._source.hasStockPhotos;
  }

  hasNoImages(): boolean {
    const { leadFlagPhotoUrl } = this.store.vehicle._source;
    return leadFlagPhotoUrl === '';
  }

  getGalleryImages(): GeneralPhoto[] | DefectPhoto[] {
    const { selectedGallery } = this.store;
    if (selectedGallery === GallerySelections.DEFECTS) {
      return this.getDefectImages();
    } else {
      return this.getGeneralImages();
    }
  }

  getGeneralImages(): GeneralPhoto[] {
    const {
      leadFlagPhotoUrl,
      otherPhotos = [],
      interiorPhotoUrl,
    } = this.store.vehicle._source;

    const vehiclePhotos = [leadFlagPhotoUrl, ...otherPhotos];
    const interiorPhotoIndex = vehiclePhotos.indexOf(interiorPhotoUrl);
    vehiclePhotos.splice(1, 0, vehiclePhotos.splice(interiorPhotoIndex, 1)[0]);

    return vehiclePhotos.map((img) => {
      return {
        original: this.getHiResImageUrl(img),
        thumbnail: img,
      };
    });
  }

  getDefectImages(): DefectPhoto[] {
    const { defectPhotos } = this.store.vehicle._source;
    const defectImages = !isEmpty(defectPhotos)
      ? defectPhotos.map(
          (img: { url: string; defectType: string; location: string }) => {
            return {
              original: this.getHiResImageUrl(img.url),
              thumbnail: img.url,
              description: `${this.getDefectTypeText(img.defectType)} - ${
                img.location
              }`,
            };
          }
        )
      : [];
    return defectImages;
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

  private getDefectTypeText(type: string): string {
    let descText = '';
    switch (type) {
      case 'Scratch':
        descText = 'Scratch';
        break;
      case 'Oxidation':
        descText = 'Paint Imperfection';
        break;
      case 'Spider Cracking':
        descText = 'Paint Imperfection';
        break;
      case 'Chip':
        descText = 'Chip';
        break;
      case 'Run':
        descText = 'Paint Imperfection';
        break;
      case 'Dent':
        descText = 'Dent';
        break;
    }
    return descText;
  }
}

export default GalleryViewModel;
