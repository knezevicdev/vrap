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
  readonly addToFavorites: string = 'Add To Favorites';

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

  async checkFavorites(): Promise<void> {
    const vin = this.getVin();
    try {
      const favoritesResponse = await this.favoritesNetworker.listFavorites(
        this.getAccessToken()
      );
      const vinList = favoritesResponse.data.data.user.favoriteVehicles;
      const found = vinList.find((element: VinList) =>
        element.vin.includes(vin)
      );
      if (found !== undefined) {
        this.favoritesStore.setFavorited;
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export default FavoritesViewModel;
