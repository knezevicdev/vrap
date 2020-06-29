import { CarsStore } from 'src/modules/cars/store';
import {
  Filters,
  FiltersData,
  MakeAndModels as FiltersDataMakeAndModels,
} from 'src/modules/cars/utils/url';

export interface Model {
  display: string;
  slug: string;
}

interface AllModel extends Model {
  isSelected: boolean;
}

class ModelsViewModel {
  private readonly allModelSlug = 'all';
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

  private removeFiltersDataMakeAndModels = (
    makeSlug: string,
    modelSlug: string,
    filtersDataMakeAndModels?: FiltersDataMakeAndModels
  ): FiltersDataMakeAndModels | undefined => {
    if (!filtersDataMakeAndModels) {
      return undefined;
    }
    const matchingMakeAndModel = filtersDataMakeAndModels.find(
      (m) => m.makeSlug === makeSlug
    );
    if (!matchingMakeAndModel) {
      return filtersDataMakeAndModels;
    }
    const isAllModel = modelSlug === this.allModelSlug;
    if (isAllModel) {
      const updatedFiltersDataMakeAndModels = filtersDataMakeAndModels.filter(
        (m) => m.makeSlug !== this.makeSlug
      );
      return updatedFiltersDataMakeAndModels.length > 0
        ? updatedFiltersDataMakeAndModels
        : undefined;
    }
    const updatedModelSlugs = matchingMakeAndModel.modelSlugs
      ? matchingMakeAndModel.modelSlugs.filter((m) => m !== modelSlug)
      : [];
    if (updatedModelSlugs.length === 0) {
      const updatedFiltersDataMakeAndModels = filtersDataMakeAndModels.filter(
        (m) => m.makeSlug !== this.makeSlug
      );
      return updatedFiltersDataMakeAndModels.length > 0
        ? updatedFiltersDataMakeAndModels
        : undefined;
    }
    const updatedFiltersDataMakeAndModels = filtersDataMakeAndModels.map(
      (makeAndModels) => {
        if (makeAndModels.makeSlug !== this.makeSlug) {
          return makeAndModels;
        }
        return {
          makeSlug: makeAndModels.makeSlug,
          modelSlugs: updatedModelSlugs,
        };
      }
    );
    return updatedFiltersDataMakeAndModels;
  };

  private addFiltersDataMakeAndModels = (
    makeSlug: string,
    modelSlug: string,
    filtersDataMakeAndModels?: FiltersDataMakeAndModels
  ): FiltersDataMakeAndModels => {
    const isAllModel = modelSlug === this.allModelSlug;
    if (!filtersDataMakeAndModels) {
      return [
        {
          makeSlug,
          modelSlugs: isAllModel ? undefined : [modelSlug],
        },
      ];
    }
    const matchingMakeAndModel = filtersDataMakeAndModels.find(
      (m) => m.makeSlug === makeSlug
    );
    if (!matchingMakeAndModel) {
      return [
        ...filtersDataMakeAndModels,
        {
          makeSlug,
          modelSlugs: isAllModel ? undefined : [modelSlug],
        },
      ];
    }
    const existingModelSlugs = matchingMakeAndModel.modelSlugs;
    if (!existingModelSlugs) {
      const updatedModelSlugs = isAllModel ? undefined : [modelSlug];
      return filtersDataMakeAndModels.map((makeAndModels) => {
        if (makeAndModels.makeSlug !== this.makeSlug) {
          return makeAndModels;
        }
        return {
          makeSlug: makeAndModels.makeSlug,
          modelSlugs: updatedModelSlugs,
        };
      });
    }
    if (existingModelSlugs.includes(modelSlug)) {
      return filtersDataMakeAndModels;
    }
    const updatedModelSlugs = isAllModel
      ? undefined
      : [...existingModelSlugs, modelSlug];
    return filtersDataMakeAndModels.map((makeAndModels) => {
      if (makeAndModels.makeSlug !== this.makeSlug) {
        return makeAndModels;
      }
      return {
        makeSlug: makeAndModels.makeSlug,
        modelSlugs: updatedModelSlugs,
      };
    });
  };

  private getUpdatedFiltersDataMakeAndModels = (
    makeSlug: string,
    modelSlug: string,
    isSelected: boolean,
    filtersDataMakeAndModels?: FiltersDataMakeAndModels
  ): FiltersDataMakeAndModels | undefined => {
    if (isSelected) {
      return this.removeFiltersDataMakeAndModels(
        makeSlug,
        modelSlug,
        filtersDataMakeAndModels
      );
    } else {
      return this.addFiltersDataMakeAndModels(
        makeSlug,
        modelSlug,
        filtersDataMakeAndModels
      );
    }
  };

  handleClick = (modelSlug: string, isSelected: boolean) => (): void => {
    const filtersData = this.carsStore.filtersData;
    const filtersDataMakeAndModels = filtersData
      ? filtersData[Filters.MAKE_AND_MODELS]
      : undefined;
    const updatedFiltersDataMakeAndModels = this.getUpdatedFiltersDataMakeAndModels(
      this.makeSlug,
      modelSlug,
      isSelected,
      filtersDataMakeAndModels
    );
    const updatedFiltersData: FiltersData = {
      ...filtersData,
      [Filters.MAKE_AND_MODELS]: updatedFiltersDataMakeAndModels,
    };
    this.carsStore.updateFiltersData(updatedFiltersData);
  };
}

export default ModelsViewModel;
