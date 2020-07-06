import isEmpty from 'lodash/isEmpty';

import { InventoryStore } from '../../store';
import GalleryConditionEnd from './components/ConditionEnd';
import GalleryGeneralToCondition from './components/GeneralToCondition';
import { GallerySelections, GalleryStore } from './store';

import globalEnv from 'src/globalEnv';
import AnalyticsHandler, {
  Product,
} from 'src/integrations/analytics/AnalyticsHandler';
import { DefectTypes } from 'src/networking/models/Inventory.v3';

interface GeneralPhoto {
  original: string;
  thumbnail: string;
}

interface DefectPhoto extends GeneralPhoto {
  description: string;
}

class GalleryViewModel {
  private inventoryStore: InventoryStore;
  private galleryStore: GalleryStore;
  private analyticsHandler: AnalyticsHandler;
  readonly defaultImage = {
    alt: 'No photos',
    src: `${globalEnv.ASSET_PREFIX}/components/ghost-suv.png`,
  };
  readonly indexSeparator: string = ' of ';
  readonly photosComing: string = 'Photos Coming Soon';
  readonly stockPhotoBody: string = `These are stock photos. When real photos become available, we'll share them here.`;
  readonly noPhotosSubtitle: string =
    "When real photos become available, we'll share\xa0them\xa0here.";

  constructor(inventoryStore: InventoryStore, galleryStore: GalleryStore) {
    this.inventoryStore = inventoryStore;
    this.galleryStore = galleryStore;
    this.analyticsHandler = new AnalyticsHandler();
  }

  showBanner(): boolean {
    return this.inventoryStore.vehicle._source.hasStockPhotos;
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

  showImageHeader(length: number): boolean {
    return length > 1;
  }

  getCurrentProduct(): Product {
    const {
      consignmentPartnerId: partnerId,
      inventoryId: sku,
      leadPhotoUrl: imageUrl,
      listingPrice: price,
      make,
      model,
      vin,
      year,
      defectPhotos,
      hasStockPhotos,
    } = this.inventoryStore.vehicle._source;
    const name = `${year} ${make} ${model}`;
    const product: Product = {
      imageUrl,
      inventoryType: partnerId ? 'Consignment' : 'Vroom',
      make,
      model,
      name,
      partnerId,
      price,
      sku,
      vin,
      year,
      defectPhotos: !!defectPhotos,
      hasStockPhotos,
    };
    return product;
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
    const { leadFlagPhotoUrl } = this.inventoryStore.vehicle._source;
    return leadFlagPhotoUrl === '';
  }

  getSelectedGallery(): string {
    return this.galleryStore.selectedGallery;
  }

  getGalleryImages(): (GeneralPhoto | DefectPhoto)[] {
    const { selectedGallery } = this.galleryStore;
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
    } = this.inventoryStore.vehicle._source;
    const { isListView } = this.galleryStore;

    const vehiclePhotos = [leadFlagPhotoUrl, ...otherPhotos];
    const interiorPhotoIndex = vehiclePhotos.indexOf(interiorPhotoUrl);
    vehiclePhotos.splice(1, 0, vehiclePhotos.splice(interiorPhotoIndex, 1)[0]);

    const generalPhotos = vehiclePhotos.map((img) => {
      return {
        original: this.getHiResImageUrl(img),
        thumbnail: img,
      };
    });
    if (vehiclePhotos.length > 1 && !isListView) {
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
    const { defectPhotos } = this.inventoryStore.vehicle._source;
    const { isListView } = this.galleryStore;
    const defectImages = !isEmpty(defectPhotos)
      ? defectPhotos.map(
          (img: { url: string; defectType: DefectTypes; location: string }) => {
            return {
              original: this.getHiResImageUrl(img.url),
              thumbnail: img.url,
              description: `${this.getDefectDisplay(img.defectType)} - ${
                img.location
              }`,
            };
          }
        )
      : [];
    if (!isListView) {
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
    }
    return defectImages;
  }

  isDefectView(): boolean {
    return this.galleryStore.selectedGallery === GallerySelections.DEFECTS;
  }

  isListView(): boolean {
    return this.galleryStore.isListView;
  }

  setListView(): void {
    const { selectedGallery, isListView } = this.galleryStore;
    const product = this.getCurrentProduct();
    this.galleryStore.changeListView();
    !isListView &&
      this.analyticsHandler.trackGalleryListView(product, selectedGallery);
  }

  handleListViewImageClick(image: string): void {
    this.galleryStore.setListViewFullscreen(image);
  }

  showListViewFullscreen(): string | undefined {
    return this.galleryStore.listViewFullscreenImage;
  }

  handleListViewFullscreenClose(): void {
    this.galleryStore.setListViewFullscreen();
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

  private getDefectDisplay(defect: DefectTypes): string {
    switch (defect) {
      case DefectTypes.SCRATCH:
        return 'Scratch';
      case DefectTypes.OXIDATION:
        return 'Paint Imperfection';
      case DefectTypes.SPIDER_CRACKING:
        return 'Paint Imperfection';
      case DefectTypes.RUN:
        return 'Paint Imperfection';
      case DefectTypes.DENT:
        return 'Dent';
      case DefectTypes.CHIP:
        return 'Chip';
      default:
        return '';
    }
  }
}

export default GalleryViewModel;
