import FavoritesNetworker from './FavoritesNetworker';
import { FavoritesStore } from './store';

import { InventoryStore } from 'src/modules/inventory/store';

interface VinList {
  vin: string;
}

class FavoritesViewModel {
  private inventoryStore: InventoryStore;
  private favoritesStore: FavoritesStore;
  private favoritesNetworker: FavoritesNetworker;
  readonly addToFavorites: string = 'ADD TO FAVORITES';
  readonly favorited: string = 'FAVORITED';

  constructor(
    inventoryStore: InventoryStore,
    favoritesStore: FavoritesStore,
    favoritesNetworker: FavoritesNetworker
  ) {
    this.inventoryStore = inventoryStore;
    this.favoritesStore = favoritesStore;
    this.favoritesNetworker = favoritesNetworker;
  }

  handleMount(): void {
    this.favoritesStore.initClientSide();
    this.isLoggedIn() && this.checkFavorites();
  }

  getVin(): string {
    return this.inventoryStore.vehicle._source.vin;
  }

  getAccessToken(): string | undefined {
    return this.favoritesStore.accessToken;
  }

  isLoggedIn(): boolean {
    return this.favoritesStore.accessToken !== undefined;
  }

  isFavorited(): boolean {
    return this.favoritesStore.isFavorited;
  }

  isLoading(): boolean {
    return this.favoritesStore.loading;
  }

  async checkFavorites(): Promise<void> {
    const vin = this.getVin();
    const accessToken = this.getAccessToken();
    try {
      const favoritesResponse = await this.favoritesNetworker.listFavorites(
        accessToken
      );
      const vinList = favoritesResponse.data.data.user.favoriteVehicles;
      const found = vinList.find((element: VinList) =>
        element.vin.includes(vin)
      );
      if (found !== undefined) {
        this.favoritesStore.setFavorited();
      }
    } catch (err) {
      console.log(err);
    }
    this.favoritesStore.setLoading(false);
  }

  async addFavorite(): Promise<void> {
    const vin = this.getVin();
    const accessToken = this.getAccessToken();
    try {
      const favoritesResponse = await this.favoritesNetworker.addFavorite(
        accessToken,
        vin
      );
      if (favoritesResponse.statusText === 'OK') {
        this.favoritesStore.setFavorited();
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export default FavoritesViewModel;
