import {
  addAllModels,
  addBodyType,
  addModel,
  setSearch,
} from '@vroom-web/catalog-url-integration';

import { AutocompleteStore } from './store';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { CarsStore } from 'src/modules/cars/store';
import { Status } from 'src/networking/types';

export interface Suggestion {
  group: string;
  label: string;
  make?: string;
  model?: string;
  bodyType?: string;
}

export type Suggestions = Suggestion[];

class AutocompleteViewModel {
  private analyticsHandler: AnalyticsHandler;
  private autocompleteStore: AutocompleteStore;
  private carsStore: CarsStore;

  readonly buttonLabel: string = 'SEARCH';
  readonly desktopInputPlaceholder: string =
    'Search by make, model, or body type';
  readonly mobileInputPlaceholder: string = 'Search';

  constructor(carsStore: CarsStore, autocompleteStore: AutocompleteStore) {
    this.analyticsHandler = new AnalyticsHandler();
    this.autocompleteStore = autocompleteStore;
    this.carsStore = carsStore;
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
    if (this.autocompleteStore.inventorySuggestions) {
      const suggestions: Suggestions = [];
      this.autocompleteStore.inventorySuggestions.Make.forEach((element) => {
        suggestions.push({
          group: 'Make',
          label: element,
          make: element,
        });
      });
      this.autocompleteStore.inventorySuggestions.Model.forEach((element) => {
        const tokens = element.split('#');
        const make = tokens[0];
        const model = tokens[1];
        suggestions.push({
          group: 'Model',
          label: element.replace('#', ' '),
          make,
          model,
        });
      });
      this.autocompleteStore.inventorySuggestions.BodyType.forEach(
        (element) => {
          suggestions.push({
            group: 'Body Type',
            label: element,
            bodyType: element,
          });
        }
      );
      return suggestions;
    }
    return [];
  }

  suggestionsLoading(): boolean {
    return (
      this.autocompleteStore.inventorySuggestionsStatus === Status.FETCHING
    );
  }

  navigateUsingAutocomplete(suggestion: Suggestion): void {
    this.analyticsHandler.trackProductSearched(
      'Autocomplete',
      suggestion.label
    );

    if (suggestion.group === 'Body Type') {
      if (!suggestion.bodyType) {
        return;
      }
      const matchingBodyType = this.carsStore.bodyTypes.find(
        (bt) => bt.api === suggestion.bodyType
      );
      if (!matchingBodyType) {
        return;
      }
      const bodyTypeFiltersData = addBodyType(
        matchingBodyType.filtersDataValue
      );
      this.carsStore.updateFiltersData(bodyTypeFiltersData);
      return;
    }

    if (suggestion.group === 'Make') {
      if (!suggestion.make) {
        return;
      }
      // FIT-596
      // This is super brittle, because this may not match the actual slug.
      // However, it's all we got until slugs are added to the suggest API response.
      // TODO: replace with slugs when suggest API returns them.
      const makeSlug = suggestion.make.toLowerCase().replace(/[\s_]/g, '-');
      const makeFiltersData = addAllModels(makeSlug);
      this.carsStore.updateFiltersData(makeFiltersData);
      return;
    }

    if (suggestion.group === 'Model') {
      if (!suggestion.make || !suggestion.model) {
        return;
      }
      // FIT-596
      // This is super brittle, because this may not match the actual slugs.
      // However, it's all we got until slugs are added to the suggest API response.
      // TODO: replace with slugs when suggest API returns them.
      const makeSlug = suggestion.make.toLowerCase().replace(/[\s_]/g, '-');
      const modelSlug = suggestion.model.toLowerCase().replace(/[\s_]/g, '-');
      const modelFiltersData = addModel(makeSlug, modelSlug);
      this.carsStore.updateFiltersData(modelFiltersData);
      return;
    }
  }

  navigateUsingSearch(): void {
    const inputValue = this.autocompleteStore.inputValue;
    this.analyticsHandler.trackProductSearched('Free Form', inputValue);
    const filtersData = setSearch(inputValue);
    this.carsStore.updateFiltersData(filtersData);
  }
}

export default AutocompleteViewModel;
