import Router from 'next/router';

import { Store } from '../../../../store';
import { Filters, Pathname, Transmission } from '../../../../util';
import { ALL_KEY, removeMakeOrModel } from '../../../util';

export interface ActiveChip {
  onDelete: () => void;
  display: string;
}

const format = (model: string): string => {
  return model.replace(/_/g, ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
};

class ChipsViewModel {
  private store: Store;

  constructor(store: Store) {
    this.store = store;
  }

  clearFilters = (): void => {
    const { replace } = Router;
    const as = '/cars';
    replace({ pathname: Pathname.WITHOUT_PARAMS }, as, { shallow: true });
  };

  getActiveFilters(): ActiveChip[] | undefined {
    const filters = this.store.filtersDataFromUrl;
    if (filters) {
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
      } = filters;
      const active = [];

      makemodels &&
        Object.keys(makemodels).forEach(make => {
          const models = makemodels[make];
          const isAll = models[0] === ALL_KEY;
          if (isAll) {
            active.push({
              display: format(make),
              onDelete: () => removeMakeOrModel(Router, make, ALL_KEY),
            });
          } else {
            models.forEach(model => {
              active.push({
                display: format(model),
                onDelete: () => removeMakeOrModel(Router, make, model),
              });
            });
          }
        });

      bodytypes &&
        bodytypes.forEach(bodytype => {
          active.push({
            display: bodytype,
            onDelete: () =>
              this.store.removeFromList(Filters.BODY_TYPES, bodytype),
          });
        });

      colors &&
        colors.forEach(color => {
          active.push({
            display: color,
            onDelete: () => this.store.removeFromList(Filters.COLORS, color),
          });
        });

      year &&
        active.push({
          display: `${year.min} - ${year.max}`,
          onDelete: () => this.store.resetFilter(Filters.YEAR),
        });

      price &&
        active.push({
          display: `$${price.min} - $${price.max}`,
          onDelete: () => this.store.resetFilter(Filters.PRICE),
        });

      miles &&
        active.push({
          display: `Up to ${miles.max} Miles`,
          onDelete: () => this.store.resetFilter(Filters.MILES),
        });

      (transmission || transmission === 0) &&
        active.push({
          display: transmission === 0 ? Transmission.AUTO : Transmission.MANUAL,
          onDelete: () => this.store.updateTransmission(Transmission.ALL),
        });

      drivetype &&
        drivetype.forEach(driveType => {
          active.push({
            display: driveType,
            onDelete: () =>
              this.store.removeFromList(Filters.DRIVE_TYPE, driveType),
          });
        });

      search &&
        active.push({
          display: `Search: ${search}`,
          onDelete: () => this.store.resetFilter(Filters.SEARCH),
        });

      return active.length > 0 ? active : undefined;
    }
  }
}

export default ChipsViewModel;
