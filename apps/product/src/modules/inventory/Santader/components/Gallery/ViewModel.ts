import { GalleryStore } from './store';

import globalEnv from 'src/globalEnv';
import AnalyticsHandler, { Product } from 'src/integrations/AnalyticsHandler';
import { InventoryStore } from 'src/modules/inventory/store';

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

  getGalleryImages(): (GeneralPhoto | DefectPhoto)[] {
    return this.getGeneralImages();
  }

  getGeneralImages(): GeneralPhoto[] {
    const {
      leadFlagPhotoUrl,
      otherPhotos,
      interiorPhotoUrl,
    } = this.inventoryStore.vehicle._source;

    const nonNullOtherPhotos = otherPhotos ? otherPhotos : [];
    const vehiclePhotos = [leadFlagPhotoUrl, ...nonNullOtherPhotos];
    const interiorPhotoIndex = vehiclePhotos.indexOf(interiorPhotoUrl);
    vehiclePhotos.splice(1, 0, vehiclePhotos.splice(interiorPhotoIndex, 1)[0]);

    const generalPhotos = vehiclePhotos.map((img) => {
      return {
        original: this.getHiResImageUrl(img),
        thumbnail: img,
      };
    });
    return generalPhotos;
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
}

export default GalleryViewModel;
