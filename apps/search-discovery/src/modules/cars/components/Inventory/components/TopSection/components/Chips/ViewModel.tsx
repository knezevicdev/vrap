import Router from 'next/router';

import { CarsStore } from 'src/modules/cars/store';
import {
  removeFromList,
  removeMakeOrModel,
  resetFilter,
  updateTransmission,
} from 'src/modules/cars/utils/navigation';
import {
  ALL_KEY,
  Filters,
  FiltersData,
  Pathname,
  Transmission,
} from 'src/modules/cars/utils/types';

export interface ActiveChip {
  onDelete: () => void;
  display: string;
}

const format = (model: string): string => {
  return model
    .replace(/_/g, ' ')
    .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
};

class ChipsViewModel {
  private readonly carsStore: CarsStore;
  readonly clearButtonLabel: string = 'Clear Filters';

  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
  }

  clearFilters = (): void => {
    const { replace } = Router;
    const as = '/cars';
    replace({ pathname: Pathname.WITHOUT_PARAMS }, as);
  };

  getActiveFilters(): ActiveChip[] | undefined {
    const filtersData = this.carsStore.filtersData;
    if (filtersData) {
      const {
        year,
        miles,
        drivetype,
        transmission,
        price,
        colors,
        bodytypes,
        makemodels,
        search,
      } = filtersData;
      const active = [];

      makemodels &&
        Object.keys(makemodels).forEach((make) => {
          const models = makemodels[make];
          const isAll = models[0] === ALL_KEY;
          if (isAll) {
            active.push({
              display: format(make),
              onDelete: () => removeMakeOrModel(make, ALL_KEY),
            });
          } else {
            models.forEach((model) => {
              active.push({
                display: format(model),
                onDelete: () => removeMakeOrModel(make, model),
              });
            });
          }
        });

      bodytypes &&
        bodytypes.forEach((bodytype) => {
          active.push({
            display: bodytype,
            onDelete: () =>
              removeFromList(
                Filters.BODY_TYPES,
                bodytype,
                filtersData as FiltersData
              ),
          });
        });

      colors &&
        colors.forEach((color) => {
          active.push({
            display: color,
            onDelete: () =>
              removeFromList(Filters.COLORS, color, filtersData as FiltersData),
          });
        });

      year &&
        active.push({
          display: `${year.min} - ${year.max}`,
          onDelete: () => resetFilter(Filters.YEAR, filtersData as FiltersData),
        });

      price &&
        active.push({
          display: `$${price.min} - $${price.max}`,
          onDelete: () =>
            resetFilter(Filters.PRICE, filtersData as FiltersData),
        });

      miles &&
        active.push({
          display: `Up to ${miles.max} Miles`,
          onDelete: () =>
            resetFilter(Filters.MILES, filtersData as FiltersData),
        });

      (transmission || transmission === 0) &&
        active.push({
          display: transmission === 0 ? Transmission.AUTO : Transmission.MANUAL,
          onDelete: () =>
            updateTransmission(Transmission.ALL, filtersData as FiltersData),
        });

      drivetype &&
        drivetype.forEach((driveType) => {
          active.push({
            display: driveType,
            onDelete: () =>
              removeFromList(
                Filters.DRIVE_TYPE,
                driveType,
                filtersData as FiltersData
              ),
          });
        });

      search &&
        active.push({
          display: `Search: ${search}`,
          onDelete: () =>
            resetFilter(Filters.SEARCH, filtersData as FiltersData),
        });

      return active.length > 0 ? active : undefined;
    }
  }
}

export default ChipsViewModel;
