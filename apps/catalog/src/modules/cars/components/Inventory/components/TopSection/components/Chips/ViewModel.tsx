import { CarsStore } from 'src/modules/cars/store';
import {
  Filters,
  FiltersData,
  removeAllModels,
  removeBodyType,
  removeColor,
  removeDriveType,
  removeModel,
  resetFilter,
} from 'src/modules/cars/utils/url';

export interface Chip {
  display: string;
  handleDelete: () => void;
}

class ChipsViewModel {
  private readonly carsStore: CarsStore;
  private currencyFormatter: Intl.NumberFormat;
  private numberFormatter: Intl.NumberFormat;
  readonly clearButtonLabel: string = 'Clear Filters';

  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
    this.currencyFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    this.numberFormatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }

  clearFilters = (): void => {
    this.carsStore.updateFiltersData(undefined);
  };

  getMakeAndModelsChips(filtersData: FiltersData): Chip[] {
    const makeAndModelsChips: Chip[] = [];
    const filtersDataMakesAndModels = filtersData[Filters.MAKE_AND_MODELS];
    if (filtersDataMakesAndModels) {
      filtersDataMakesAndModels.forEach((filtersDataMakeAndModels) => {
        const matchingMakeBucket = this.carsStore.makeBuckets
          ? this.carsStore.makeBuckets.find(
              (mb) => mb.slug === filtersDataMakeAndModels.makeSlug
            )
          : undefined;
        if (matchingMakeBucket) {
          if (!filtersDataMakeAndModels.modelSlugs) {
            makeAndModelsChips.push({
              display: matchingMakeBucket.key,
              handleDelete: () => {
                const updatedFiltersData = removeAllModels(
                  filtersDataMakeAndModels.makeSlug,
                  filtersData
                );
                this.carsStore.updateFiltersData(updatedFiltersData);
              },
            });
          } else {
            filtersDataMakeAndModels.modelSlugs.forEach((modelSlug) => {
              const matchingModelBucket = matchingMakeBucket.model_count.buckets.find(
                (mb) => mb.slug === modelSlug
              );
              if (matchingModelBucket) {
                makeAndModelsChips.push({
                  display: `${matchingMakeBucket.key} ${matchingModelBucket.key}`,
                  handleDelete: () => {
                    const updatedFiltersData = removeModel(
                      filtersDataMakeAndModels.makeSlug,
                      modelSlug,
                      filtersData
                    );
                    this.carsStore.updateFiltersData(updatedFiltersData);
                  },
                });
              }
            });
          }
        }
      });
    }
    return makeAndModelsChips;
  }

  getBodyTypesChips(filtersData: FiltersData): Chip[] {
    const bodyTypesChips: Chip[] = [];
    const filtersDataBodyTypes = filtersData[Filters.BODY_TYPES];
    if (filtersDataBodyTypes) {
      filtersDataBodyTypes.forEach((filtersDataBodyType) => {
        const matchingBodyType = this.carsStore.bodyTypes.find(
          (bodyType) => bodyType.filtersDataValue === filtersDataBodyType
        );
        if (matchingBodyType) {
          bodyTypesChips.push({
            display: matchingBodyType.display,
            handleDelete: () => {
              const updatedFiltersData = removeBodyType(
                filtersDataBodyType,
                filtersData
              );
              this.carsStore.updateFiltersData(updatedFiltersData);
            },
          });
        }
      });
    }
    return bodyTypesChips;
  }

  getColorsChips(filtersData: FiltersData): Chip[] {
    const colorsChips: Chip[] = [];
    const filtersDataColors = filtersData[Filters.COLORS];
    if (filtersDataColors) {
      filtersDataColors.forEach((filtersDataColor) => {
        const matchingColor = this.carsStore.colors.find(
          (color) => color.filtersDataValue === filtersDataColor
        );
        if (matchingColor) {
          colorsChips.push({
            display: matchingColor.display,
            handleDelete: () => {
              const updatedFiltersData = removeColor(
                filtersDataColor,
                filtersData
              );
              this.carsStore.updateFiltersData(updatedFiltersData);
            },
          });
        }
      });
    }
    return colorsChips;
  }

  getYearChips(filtersData: FiltersData): Chip[] {
    const yearChips: Chip[] = [];
    const filtersDataYear = filtersData[Filters.YEAR];
    if (filtersDataYear) {
      const display =
        filtersDataYear.min === filtersDataYear.max
          ? `${filtersDataYear.min}`
          : `${filtersDataYear.min} - ${filtersDataYear.max}`;
      yearChips.push({
        display,
        handleDelete: () => {
          const updatedFiltersData = resetFilter(Filters.YEAR, filtersData);
          this.carsStore.updateFiltersData(updatedFiltersData);
        },
      });
    }
    return yearChips;
  }

  getPriceChips(filtersData: FiltersData): Chip[] {
    const priceChips: Chip[] = [];
    const filtersDataPrice = filtersData[Filters.PRICE];
    if (filtersDataPrice) {
      const display =
        filtersDataPrice.min === filtersDataPrice.max
          ? this.currencyFormatter.format(filtersDataPrice.min)
          : `${this.currencyFormatter.format(
              filtersDataPrice.min
            )} - ${this.currencyFormatter.format(filtersDataPrice.max)}`;
      priceChips.push({
        display,
        handleDelete: () => {
          const updatedFiltersData = resetFilter(Filters.PRICE, filtersData);
          this.carsStore.updateFiltersData(updatedFiltersData);
        },
      });
    }
    return priceChips;
  }

  getMilesChips(filtersData: FiltersData): Chip[] {
    const milesChips: Chip[] = [];
    const filtersDataMiles = filtersData[Filters.MILES];
    if (filtersDataMiles) {
      milesChips.push({
        display: `Up to ${this.numberFormatter.format(
          filtersDataMiles.max
        )} Miles`,
        handleDelete: () => {
          const updatedFiltersData = resetFilter(Filters.MILES, filtersData);
          this.carsStore.updateFiltersData(updatedFiltersData);
        },
      });
    }
    return milesChips;
  }

  getTransmissionChips(filtersData: FiltersData): Chip[] {
    const transmissionChips: Chip[] = [];
    const filtersDataTransmission = filtersData[Filters.TRANSMISSION];
    if (filtersDataTransmission) {
      const matchingTransmission = this.carsStore.transmissions.find(
        (transmission) =>
          transmission.filtersDataValue === filtersDataTransmission
      );
      if (matchingTransmission) {
        transmissionChips.push({
          display: matchingTransmission.display,
          handleDelete: () => {
            const updatedFiltersData = resetFilter(
              Filters.TRANSMISSION,
              filtersData
            );
            this.carsStore.updateFiltersData(updatedFiltersData);
          },
        });
      }
    }
    return transmissionChips;
  }

  getDriveTypesChips(filtersData: FiltersData): Chip[] {
    const driveTypesChips: Chip[] = [];
    const filtersDataDriveTypes = filtersData[Filters.DRIVE_TYPE];
    if (filtersDataDriveTypes) {
      filtersDataDriveTypes.forEach((filtersDataDriveType) => {
        const matchingDriveType = this.carsStore.driveTypes.find(
          (dt) => dt.filtersDataValue === filtersDataDriveType
        );
        if (matchingDriveType) {
          driveTypesChips.push({
            display: matchingDriveType.display,
            handleDelete: () => {
              const updatedFiltersData = removeDriveType(
                filtersDataDriveType,
                filtersData
              );
              this.carsStore.updateFiltersData(updatedFiltersData);
            },
          });
        }
      });
    }
    return driveTypesChips;
  }

  getSearchChips(filtersData: FiltersData): Chip[] {
    const searchChips: Chip[] = [];
    const filtersDataSearch = filtersData[Filters.SEARCH];
    if (filtersDataSearch) {
      searchChips.push({
        display: `Search: ${filtersDataSearch}`,
        handleDelete: (): void => {
          const updatedFiltersData = resetFilter(Filters.SEARCH, filtersData);
          this.carsStore.updateFiltersData(updatedFiltersData);
        },
      });
    }
    return searchChips;
  }

  getChips(): Chip[] | undefined {
    const filtersData = this.carsStore.filtersData;
    if (!filtersData) {
      return;
    }
    const chips: Chip[] = [
      ...this.getMakeAndModelsChips(filtersData),
      ...this.getBodyTypesChips(filtersData),
      ...this.getColorsChips(filtersData),
      ...this.getYearChips(filtersData),
      ...this.getPriceChips(filtersData),
      ...this.getMilesChips(filtersData),
      ...this.getTransmissionChips(filtersData),
      ...this.getDriveTypesChips(filtersData),
      ...this.getSearchChips(filtersData),
    ];
    return chips.length > 0 ? chips : undefined;
  }
}

export default ChipsViewModel;