import {
  addAllModels,
  addModel,
  Filters,
  removeAllModels,
  removeModel,
} from '@vroom-web/catalog-url-integration';

import { CarsStore } from 'src/modules/cars/store';

export interface Model {
  display: string;
  slug: string;
}

interface AllModel extends Model {
  isSelected: boolean;
}

class ModelsViewModel {
  private readonly allModelSlug = 'all-models';
  private readonly allModelSelected: AllModel = {
    display: 'Unselect All',
    slug: this.allModelSlug,
    isSelected: true,
  };
  private readonly allModelUnselected: AllModel = {
    display: 'Select All',
    slug: this.allModelSlug,
    isSelected: false,
  };
  private readonly carsStore: CarsStore;
  private readonly makeSlug: string;

  readonly models: Model[];

  constructor(makeSlug: string, models: Model[], carsStore: CarsStore) {
    this.makeSlug = makeSlug;
    this.models = models;
    this.carsStore = carsStore;
  }

  getAllModel = (): AllModel => {
    const filtersData = this.carsStore.filtersData;
    if (!filtersData) {
      return this.allModelUnselected;
    }
    const filtersDataMakeAndModels = filtersData[Filters.MAKE_AND_MODELS];
    if (!filtersDataMakeAndModels) {
      return this.allModelUnselected;
    }
    const matchingFiltersDataMake = filtersDataMakeAndModels.find(
      (m) => m.makeSlug === this.makeSlug
    );
    if (!matchingFiltersDataMake) {
      return this.allModelUnselected;
    }
    if (!matchingFiltersDataMake.modelSlugs) {
      return this.allModelSelected;
    }
    return this.allModelUnselected;
  };

  isSelected = (modelSlug: string): boolean => {
    const filtersData = this.carsStore.filtersData;
    if (!filtersData) {
      return false;
    }
    const filtersDataMakeAndModels = filtersData[Filters.MAKE_AND_MODELS];
    if (!filtersDataMakeAndModels) {
      return false;
    }
    const matchingFiltersDataMake = filtersDataMakeAndModels.find(
      (m) => m.makeSlug === this.makeSlug
    );
    if (!matchingFiltersDataMake) {
      return false;
    }
    if (!matchingFiltersDataMake.modelSlugs) {
      return false;
    }
    return matchingFiltersDataMake.modelSlugs.includes(modelSlug);
  };

  private handleClickAllModel = (isSelected: boolean): void => {
    const filtersData = this.carsStore.filtersData;
    const updatedFiltersData = isSelected
      ? removeAllModels(this.makeSlug, filtersData)
      : addAllModels(this.makeSlug, filtersData);
    this.carsStore.updateFiltersData(updatedFiltersData);
  };

  private handleClickModel = (modelSlug: string, isSelected: boolean): void => {
    const filtersData = this.carsStore.filtersData;
    const updatedFiltersData = isSelected
      ? removeModel(this.makeSlug, modelSlug, filtersData)
      : addModel(this.makeSlug, modelSlug, filtersData);
    this.carsStore.updateFiltersData(updatedFiltersData);
  };

  handleClick = (modelSlug: string, isSelected: boolean) => (): void => {
    const isAllModel = modelSlug === this.allModelSlug;
    isAllModel
      ? this.handleClickAllModel(isSelected)
      : this.handleClickModel(modelSlug, isSelected);
  };
}

export default ModelsViewModel;
