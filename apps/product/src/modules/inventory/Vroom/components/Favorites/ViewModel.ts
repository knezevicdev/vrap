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
  readonly dialogTitle: string = 'SAVE THIS CAR TO YOUR LIST';
  readonly dialogBody: string =
    'Create an account to keep track and access your saved cars anytime.';
  readonly createAccountButton: string = 'CREATE ACCOUNT';
  readonly logInButton: string = 'LOG IN';
  readonly snackbarSuccessMessage: string = 'Your favorites have been updated';
  readonly snackbarErrorMessage: string =
    'There was a problem. Please try again';

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
    this.isLoggedIn() ? this.checkFavorites() : this.setLoading(false);
  }

  handleDialogActions(location: string): void {
    const currentUrl = window.location.pathname;
    window.location.href = `/account/${location}?redirect=${currentUrl}&action=favorite`;
  }

  handleDialog(): void {
    this.favoritesStore.setDialog();
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

  setLoading(flag: boolean): void {
    this.favoritesStore.setLoading(flag);
  }

  isOpen(): boolean {
    return this.favoritesStore.isDialogOpen;
  }

  handleSnackbar(): void {
    this.favoritesStore.setSnackbar();
  }

  isSnackbarOpen(): boolean {
    return this.favoritesStore.isSnackbarOpen;
  }

  getSnarbarMessage(): string {
    return this.favoritesStore.isError
      ? this.snackbarErrorMessage
      : this.snackbarSuccessMessage;
  }

  handleError(): void {
    this.favoritesStore.setError();
  }

  isError(): boolean {
    return this.favoritesStore.isError;
  }

  async checkFavorites(): Promise<void> {
    this.setLoading(true);
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
      } else if (this.inventoryStore.actionFavorite) {
        await this.addFavorite();
      }
    } catch (err) {
      console.error(JSON.stringify(err));
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
      const vinList =
        favoritesResponse.data.data.userAddFavoriteVehicles.favoriteVehicles;
      const found = vinList.find((element: VinList) =>
        element.vin.includes(vin)
      );
      if (found) {
        this.isError() && this.handleError();
        this.favoritesStore.setFavorited();
        this.handleSnackbar();
      }
    } catch {
      !this.isError() && this.handleError();
      this.handleSnackbar();
    }
  }

  async removeFavorite(): Promise<void> {
    const vin = this.getVin();
    const accessToken = this.getAccessToken();
    try {
      const favoritesResponse = await this.favoritesNetworker.removeFavorite(
        accessToken,
        vin
      );
      const vinList =
        favoritesResponse.data.data.userRemoveFavoriteVehicles.favoriteVehicles;
      const found = vinList.find((element: VinList) =>
        element.vin.includes(vin)
      );
      if (!found) {
        this.isError() && this.handleError();
        this.favoritesStore.setFavorited();
        this.handleSnackbar();
      }
    } catch {
      !this.isError() && this.handleError();
      this.handleSnackbar();
    }
  }
}

export default FavoritesViewModel;
