import {
  addAllModels,
  addBodyType,
  addModel,
  BodyType as FilterBodyTypeData,
  getUrlFromFiltersData,
} from '@vroom-web/catalog-url-integration';
import { stringify } from 'qs';

import { AutocompleteStore } from './store';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { showDefaultVariant } from 'src/integrations/experimentSDK';
import { HomeStore } from 'src/modules/home/store';
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
  private homeStore: HomeStore;

  readonly buttonLabel: string = 'SEARCH';
  readonly inputPlaceholder: string = 'Search by make, model, or body type';

  constructor(homeStore: HomeStore, autocompleteStore: AutocompleteStore) {
    this.analyticsHandler = new AnalyticsHandler();
    this.autocompleteStore = autocompleteStore;
    this.homeStore = homeStore;
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

    // FIT-566
    // Persist query string across navigation.
    // This allows vlassic attributuion to work until we can implement a better system.
    const queryString = stringify(this.homeStore.query, {
      addQueryPrefix: false,
    });
    const oldCatalogVsNewCatalogDefaultVarient = showDefaultVariant(
      'snd-old-catalog-vs-new-catalog',
      this.homeStore.experiments,
      this.homeStore.query
    );

    if (suggestion.group === 'Body Type') {
      if (!suggestion.bodyType) {
        return;
      }
      const bodyType =
        suggestion.bodyType === 'Van Minivan'
          ? 'minivan'
          : suggestion.bodyType.toLowerCase();
      const filterBodyType = addBodyType(bodyType as FilterBodyTypeData);
      const bodyHref = getUrlFromFiltersData(filterBodyType);
      oldCatalogVsNewCatalogDefaultVarient
        ? (window.location.href = `/catalog/all-years/all-makes/${bodyType}?${queryString}`)
        : (window.location.href = `${bodyHref}&${queryString}`);
      return;
    }

    if (suggestion.group === 'Make') {
      if (!suggestion.make) {
        return;
      }
      const make = suggestion.make.toLowerCase().replace(/[\s-]/g, '_');
      const allModelsFiltersData = addAllModels(make);
      const allModelsHref = getUrlFromFiltersData(allModelsFiltersData);
      oldCatalogVsNewCatalogDefaultVarient
        ? (window.location.href = `/catalog/all-years/${make}?${queryString}`)
        : (window.location.href = `${allModelsHref}&${queryString}`);
      return;
    }

    if (suggestion.group === 'Model') {
      if (!suggestion.make || !suggestion.model) {
        return;
      }
      const make = suggestion.make.toLowerCase().replace(/[\s-]/g, '_');
      const model = suggestion.model.toLowerCase().replace(/[\s-]/g, '_');
      const modelFiltersData = addModel(make, model);
      const modelHref = getUrlFromFiltersData(modelFiltersData);
      oldCatalogVsNewCatalogDefaultVarient
        ? (window.location.href = `/catalog/all-years/${make}_${model}?${queryString}`)
        : (window.location.href = `${modelHref}&${queryString}`);
      return;
    }
  }

  navigateUsingSearch(): void {
    const inputValue = this.autocompleteStore.inputValue;
    this.analyticsHandler.trackProductSearched('Free Form', inputValue);

    // FIT-566
    // Persist query string across navigation.
    // This allows vlassic attributuion to work until we can implement a better system.
    const query = {
      ...this.homeStore.query,
      search: inputValue,
    };
    const queryString = stringify(query, {
      addQueryPrefix: true,
    });
    const oldCatalogVsNewCatalogDefaultVarient = showDefaultVariant(
      'snd-old-catalog-vs-new-catalog',
      this.homeStore.experiments,
      this.homeStore.query
    );
    window.location.href = `/${
      oldCatalogVsNewCatalogDefaultVarient ? `catalog` : `cars`
    }${queryString}`;
  }
}

export default AutocompleteViewModel;
