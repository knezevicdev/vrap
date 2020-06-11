import isEmpty from 'lodash/isEmpty';

import { GallerySelections, InventoryStore } from '../../store';
import GalleryConditionEnd from '../GalleryConditionEnd';
import GalleryGeneralToCondition from '../GalleryGeneralToCondition';

import globalEnv from 'src/globalEnv';

interface GeneralPhoto {
  original: string;
  thumbnail: string;
}

interface DefectPhoto extends GeneralPhoto {
  description: string;
}

enum DefectTypes {
  SCRATCH = 'Scratch',
  OXIDATION = 'Oxidation',
  PAINT_IMPERFECTION = 'Paint Imperfection',
  SPIDER_CRACKING = 'Spider Cracking',
  CHIP = 'Chip',
  RUN = 'Run',
  DENT = 'Dent',
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

  showIndex(): boolean {
    const galleryImages = this.getGalleryImages();
    return galleryImages.length > 1;
  }

  showThumbnails(isMobile: boolean): boolean {
    const galleryImages = this.getGalleryImages();
    if (isMobile || galleryImages.length <= 1) {
      return false;
    }
    return true;
  }

  getThumbnailPosition(
    isMobile: boolean,
    fullscreen: boolean
  ): 'bottom' | 'right' {
    const galleryImages = this.getGalleryImages();
    if (isMobile || fullscreen || galleryImages.length <= 1) {
      return 'bottom';
    }
    return 'right';
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

    const generalPhotos = vehiclePhotos.map((img) => {
      return {
        original: this.getHiResImageUrl(img),
        thumbnail: img,
      };
    });
    if (vehiclePhotos.length > 1) {
      const addGeneralToCondition: {
        original: string;
        thumbnail: string;
        renderItem: React.FunctionComponent;
      } = {
        original: this.defaultImage.src,
        //TODO: Replace with designs photo
        thumbnail: this.defaultImage.src,
        renderItem: GalleryGeneralToCondition,
      };
      generalPhotos.push(addGeneralToCondition);
    }
    return generalPhotos;
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

    const addGalleryEndCard: {
      original: string;
      thumbnail: string;
      description: string;
      renderItem: React.FunctionComponent;
    } = {
      original: this.defaultImage.src,
      //TODO: Replace with designs photo
      thumbnail: this.defaultImage.src,
      description: 'Condition End Card',
      renderItem: GalleryConditionEnd,
    };
    defectImages.push(addGalleryEndCard);

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
    const {
      SCRATCH,
      OXIDATION,
      PAINT_IMPERFECTION,
      SPIDER_CRACKING,
      CHIP,
      RUN,
      DENT,
    } = DefectTypes;
    let descText = '';
    switch (type) {
      case SCRATCH:
        descText = SCRATCH;
        break;
      case OXIDATION:
        descText = PAINT_IMPERFECTION;
        break;
      case SPIDER_CRACKING:
        descText = PAINT_IMPERFECTION;
        break;
      case CHIP:
        descText = CHIP;
        break;
      case RUN:
        descText = PAINT_IMPERFECTION;
        break;
      case DENT:
        descText = DENT;
        break;
    }
    return descText;
  }
}

export default GalleryViewModel;
