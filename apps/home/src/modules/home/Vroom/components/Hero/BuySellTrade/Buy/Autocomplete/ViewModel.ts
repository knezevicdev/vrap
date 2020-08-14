import {
  addAllModels,
  addBodyType,
  addModel,
  BodyType as FilterBodyTypeData,
  getUrlFromFiltersData,
  setSearch,
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

  readonly buttonLabel: string = 'Find your car';
  readonly inputPlaceholder: string = 'Enter make, model or body style';
  readonly label: string = 'Search Cars';

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
    //TODO: Replace with makeSlug from suggestion api
    const replaceCharacterForSlug = oldCatalogVsNewCatalogDefaultVarient
      ? '_'
      : '-';
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
      const bodyHrefNewCatalogQueryStringSep =
        bodyHref.indexOf('?') === -1 ? '?' : '&';
      const bodyHrefOldCatalogHref =
        queryString.length > 0
          ? `/catalog/all-years/all-makes/${bodyType}?${queryString}`
          : `/catalog/all-years/all-makes/${bodyType}`;
      const bodyHrefNewCatalogHref =
        queryString.length > 0
          ? `${bodyHref}${bodyHrefNewCatalogQueryStringSep}${queryString}`
          : bodyHref;
      oldCatalogVsNewCatalogDefaultVarient
        ? (window.location.href = bodyHrefOldCatalogHref)
        : (window.location.href = bodyHrefNewCatalogHref);
      return;
    }

    if (suggestion.group === 'Make') {
      if (!suggestion.make) {
        return;
      }
      const make = suggestion.make
        .toLowerCase()
        .replace(/[\s-_]/g, replaceCharacterForSlug);
      const allModelsFiltersData = addAllModels(make);
      const allModelsHref = getUrlFromFiltersData(allModelsFiltersData);
      const allModelsHrefNewCatalogQueryStringSep =
        allModelsHref.indexOf('?') === -1 ? '?' : '&';
      const allModelsHrefOldCatalogHref =
        queryString.length > 0
          ? `/catalog/all-years/${make}?${queryString}`
          : `/catalog/all-years/${make}`;
      const allModelsHrefNewCatalogHref =
        queryString.length > 0
          ? `${allModelsHref}${allModelsHrefNewCatalogQueryStringSep}${queryString}`
          : allModelsHref;
      oldCatalogVsNewCatalogDefaultVarient
        ? (window.location.href = allModelsHrefOldCatalogHref)
        : (window.location.href = allModelsHrefNewCatalogHref);
      return;
    }

    if (suggestion.group === 'Model') {
      if (!suggestion.make || !suggestion.model) {
        return;
      }
      const make = suggestion.make
        .toLowerCase()
        .replace(/[\s-_]/g, replaceCharacterForSlug);
      const model = suggestion.model
        .toLowerCase()
        .replace(/[\s-_]/g, replaceCharacterForSlug);
      const modelFiltersData = addModel(make, model);
      const modelHref = getUrlFromFiltersData(modelFiltersData);
      const modelHrefOldCatalogHref =
        queryString.length > 0
          ? `/catalog/all-years/${make}_${model}?${queryString}`
          : `/catalog/all-years/${make}_${model}`;
      const modelHrefNewCatalogQueryStringSep =
        modelHref.indexOf('?') === -1 ? '?' : '&';
      const modelHrefNewCatalogHref =
        queryString.length > 0
          ? `${modelHref}${modelHrefNewCatalogQueryStringSep}${queryString}`
          : modelHref;
      oldCatalogVsNewCatalogDefaultVarient
        ? (window.location.href = modelHrefOldCatalogHref)
        : (window.location.href = modelHrefNewCatalogHref);
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
      addQueryPrefix: false,
    });
    const oldCatalogVsNewCatalogDefaultVarient = showDefaultVariant(
      'snd-old-catalog-vs-new-catalog',
      this.homeStore.experiments,
      this.homeStore.query
    );
    if (oldCatalogVsNewCatalogDefaultVarient) {
      window.location.href = `/catalog/?${queryString}`;
    } else {
      const filtersData = setSearch(inputValue);
      const searchUrl = getUrlFromFiltersData(filtersData, {
        addFiltersQueryParam: true,
      });
      const queryStringSep = searchUrl.indexOf('?') === -1 ? '?' : '&';
      window.location.href = `${searchUrl}${queryStringSep}${queryString}`;
    }
  }
}

export default AutocompleteViewModel;
