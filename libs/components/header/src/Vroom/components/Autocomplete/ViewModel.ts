import { stringify } from 'qs';

import AnalyticsHandler, {
  TrackProductSearchedLabel,
} from '../../integrations/AnalyticsHandler';
import { Status } from '../../networking/types';
import { AutocompleteStore } from './store';

// TODO: Extract catalog navigation logic into a dedicated library.

export const ALL_KEY = 'all';

export enum Filters {
  MAKE_AND_MODELS = 'makemodels',
  BODY_TYPES = 'bodytypes',
  SEARCH = 'search',
}

export interface MakeAndModels {
  [make: string]: string[];
}

export interface FiltersData {
  [Filters.MAKE_AND_MODELS]?: MakeAndModels;
  [Filters.BODY_TYPES]?: string[];
  [Filters.SEARCH]?: string;
}

export interface BodyType {
  display: string;
  url: string;
  api: string;
}

export enum BodyTypeURL {
  SUV = 'suv',
  SEDAN = 'sedan',
  TRUCK = 'truck',
  COUPE = 'coupe',
  CONVERTIBLE = 'convertible',
  WAGON = 'wagon',
  HATCHBACK = 'hatchback',
  MINIVAN = 'minivan',
}

export enum BodyTypeDisplay {
  SUV = 'SUV',
  SEDAN = 'Sedan',
  TRUCK = 'Truck',
  COUPE = 'Coupe',
  CONVERTIBLE = 'Convertible',
  WAGON = 'Wagon',
  HATCHBACK = 'Hatchback',
  MINIVAN = 'Minivan',
}

export enum BodyTypeAPI {
  SUV = 'SUV',
  SEDAN = 'Sedan',
  TRUCK = 'Pickup Truck',
  COUPE = 'Coupe',
  CONVERTIBLE = 'Convertible',
  WAGON = 'Wagon',
  HATCHBACK = 'Hatchback',
  MINIVAN = 'Van Minivan',
}

export const bodyTypes = [
  {
    display: BodyTypeDisplay.SUV,
    url: BodyTypeURL.SUV,
    api: BodyTypeAPI.SUV,
  },
  {
    display: BodyTypeDisplay.SEDAN,
    url: BodyTypeURL.SEDAN,
    api: BodyTypeAPI.SEDAN,
  },
  {
    display: BodyTypeDisplay.TRUCK,
    url: BodyTypeURL.TRUCK,
    api: BodyTypeAPI.TRUCK,
  },
  {
    display: BodyTypeDisplay.COUPE,
    url: BodyTypeURL.COUPE,
    api: BodyTypeAPI.COUPE,
  },
  {
    display: BodyTypeDisplay.CONVERTIBLE,
    url: BodyTypeURL.CONVERTIBLE,
    api: BodyTypeAPI.CONVERTIBLE,
  },
  {
    display: BodyTypeDisplay.WAGON,
    url: BodyTypeURL.WAGON,
    api: BodyTypeAPI.WAGON,
  },
  {
    display: BodyTypeDisplay.HATCHBACK,
    url: BodyTypeURL.HATCHBACK,
    api: BodyTypeAPI.HATCHBACK,
  },
  {
    display: BodyTypeDisplay.MINIVAN,
    url: BodyTypeURL.MINIVAN,
    api: BodyTypeAPI.MINIVAN,
  },
];

export interface Suggestion {
  group: string;
  label: string;
  make?: string;
  model?: string;
  bodyType?: string;
}

export type Suggestions = Suggestion[];

interface ConstructorData {
  autocompleteStore: AutocompleteStore;
  classes?: object;
}

class AutocompleteViewModel {
  readonly classes?: object;
  readonly inputPlaceholder: string = 'Enter make, model or body type';

  private analyticsHandler: AnalyticsHandler;
  private autocompleteStore: AutocompleteStore;

  constructor(constructorData: ConstructorData) {
    this.analyticsHandler = new AnalyticsHandler();
    this.autocompleteStore = constructorData.autocompleteStore;
    this.classes = constructorData.classes;
  }

  inputValue(): string {
    return this.autocompleteStore.inputValue;
  }

  setInputValue(value: string): void {
    this.autocompleteStore.setInputValue(value);
  }

  suggestions(): Suggestions {
    if (this.suggestionsLoading()) {
      return [];
    }
    if (!this.autocompleteStore.inventorySuggestions) {
      return [];
    }

    const sanitize = (str: string): string => {
      const toUnderscoreRegex = /-| /g;
      return str.replace(toUnderscoreRegex, '_').toLowerCase();
    };

    const suggestions: Suggestions = [];
    this.autocompleteStore.inventorySuggestions.Make.forEach((element) => {
      suggestions.push({
        group: 'Make',
        label: element,
        make: sanitize(element),
      });
    });
    this.autocompleteStore.inventorySuggestions.Model.forEach((element) => {
      const tokens = element.split('#');
      const make = sanitize(tokens[0]);
      const model = sanitize(tokens[1]);
      suggestions.push({
        group: 'Model',
        label: element.replace('#', ' '),
        make,
        model,
      });
    });
    this.autocompleteStore.inventorySuggestions.BodyType.forEach((element) => {
      suggestions.push({
        group: 'Body Type',
        label: element,
        bodyType: element,
      });
    });
    return suggestions;
  }

  suggestionsLoading(): boolean {
    return (
      this.autocompleteStore.inventorySuggestionsStatus === Status.FETCHING
    );
  }

  navigateToCatalog(filtersData: FiltersData): void {
    const encodedFilters = btoa(stringify(filtersData, { encode: false }));
    const asQuery = `?filters=${encodedFilters}`;

    const bodyTypesFromFilters = filtersData[Filters.BODY_TYPES];
    const bodyType = bodyTypesFromFilters ? bodyTypesFromFilters[0] : undefined;
    const makeAndModelsFromFilters = filtersData[Filters.MAKE_AND_MODELS];
    const makeKeys = makeAndModelsFromFilters
      ? Object.keys(makeAndModelsFromFilters)
      : undefined;
    const make = makeKeys ? makeKeys[0] : undefined;
    const models = make
      ? makeAndModelsFromFilters && makeAndModelsFromFilters[make]
      : undefined;
    const model = models && models[0] !== ALL_KEY ? models[0] : undefined;
    const descriptorsCombined = [make, model, bodyType]
      .filter((value) => value)
      .join('-');
    const descriptor = descriptorsCombined ? `/${descriptorsCombined}` : '';

    const asParams = `${descriptor}`;

    const href = `/cars${asParams}${asQuery}`;
    window.location.href = href;
  }

  handleAutocompleteChange(value: Suggestion | string | null): void {
    // Ignore if the value isn't a suggestion from ths list.
    if (!value || typeof value === 'string') {
      return;
    }
    this.analyticsHandler.trackProductSearched(
      TrackProductSearchedLabel.AUTOCOMPLETE,
      value.label
    );
    const { group } = value;
    const makeAndModelsKey = Filters.MAKE_AND_MODELS;
    const bodyTypeKey = Filters.BODY_TYPES;
    const getFilterData = (): FiltersData => {
      const make = value.make as string;
      const model = value.model as string;
      switch (group) {
        case 'Make':
          return { [makeAndModelsKey]: { [make]: [ALL_KEY] } };
        case 'Model':
          return { [makeAndModelsKey]: { [make]: [model] } };
        default: {
          const bodyType = value.bodyType as string;
          const bodyTypeUrl = (bodyTypes.find(
            (body) => body.api === bodyType
          ) as BodyType).url;
          return { [bodyTypeKey]: [bodyTypeUrl] };
        }
      }
    };
    this.navigateToCatalog(getFilterData());
  }

  handleAutocompleteEnterKeyDown(): void {
    const inputValue = this.autocompleteStore.inputValue;
    this.analyticsHandler.trackProductSearched(
      TrackProductSearchedLabel.FREE_FORM,
      inputValue
    );
    this.navigateToCatalog({ [Filters.SEARCH]: inputValue });
  }
}

export default AutocompleteViewModel;
