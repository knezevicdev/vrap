import Router from 'next/router';

import { Store } from '../../../../../../store';
import { Filters, FiltersData, MakeAndModels } from '../../../../../../util';
import {
  ALL_KEY,
  removeMakeOrModel,
  sanitize,
  updateUrl,
} from '../../../../../util';

const add = (
  make: string,
  model: string,
  total: number,
  store: Store
): void => {
  const urlFilters = store.filtersDataFromUrl;
  const key = Filters.MAKE_AND_MODELS;
  const modelToAdd = sanitize(model);
  const makeToAdd = sanitize(make);

  const getUpdatedFilters = (): FiltersData => {
    if (urlFilters) {
      const makeAndModels = urlFilters[key];
      if (makeAndModels) {
        const make = makeAndModels[makeToAdd];
        if (make) {
          const addForAllAndNewAdd = 2;
          if (
            modelToAdd === ALL_KEY ||
            make.length + addForAllAndNewAdd === total
          ) {
            make.splice(0, make.length);
            make.push(ALL_KEY);
          } else {
            make.indexOf(ALL_KEY) === 0 &&
              make.splice(make.indexOf(ALL_KEY), 1);
            make.push(modelToAdd);
          }
          return { ...urlFilters, [key]: makeAndModels };
        } else {
          makeAndModels[makeToAdd] = [modelToAdd];
          return {
            ...urlFilters,
            [key]: makeAndModels,
          };
        }
      } else {
        return {
          ...urlFilters,
          [key]: { [makeToAdd]: [modelToAdd] },
        };
      }
    } else {
      return { [key]: { [makeToAdd]: [modelToAdd] } };
    }
  };

  const updatedFilters = getUpdatedFilters();
  updateUrl(updatedFilters, Router);
};

const getMakesAndModelsFromUrl = (store: Store): MakeAndModels | undefined => {
  const key = Filters.MAKE_AND_MODELS;
  const urlFilters = store.filtersDataFromUrl;
  return (urlFilters && urlFilters[key]) || undefined;
};

class ModelsViewModel {
  private readonly make: string;
  private readonly models: string[];
  private readonly urlMakesAndModels: MakeAndModels | undefined;
  private store: Store;

  constructor(make: string, models: string[], store: Store) {
    this.make = make;
    this.models = models;
    this.urlMakesAndModels = getMakesAndModelsFromUrl(store);
    this.store = store;
  }

  onClick = (model: string, isSelected: boolean | undefined) => (): void => {
    if (!isSelected) {
      add(this.make, model, this.models.length, this.store);
    } else {
      removeMakeOrModel(Router, this.make, model);
    }
  };

  getModelInfo = (model: string): { display: string; isSelected: boolean } => {
    const sModel = sanitize(model);
    const sMake = sanitize(this.make);

    const isSelected =
      (this.urlMakesAndModels &&
        this.urlMakesAndModels[sMake] &&
        this.urlMakesAndModels[sMake].includes(sModel)) ||
      false;

    const display =
      sModel === ALL_KEY ? (isSelected ? 'Unselect All' : 'Select All') : model;

    return { display, isSelected };
  };
}

export default ModelsViewModel;
