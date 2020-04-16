import Router from 'next/router';

import { Filters, FiltersData } from '../../../modules/cars/util';
import { HeaderAutocompleteStore } from './store';

import AnalyticsHandler from 'src/integrations/analytics/AnalyticsHandler';
import {
  BodyType,
  bodyTypes,
} from 'src/modules/cars/components/Filters/components/BodyTypes/types';
import { ALL_KEY, sanitize, updateUrl } from 'src/modules/cars/components/util';
import { Status } from 'src/networking/types';

export interface Suggestion {
  group: string;
  label: string;
  make?: string;
  model?: string;
  bodyType?: string;
}

export type Suggestions = Suggestion[];

class HeaderAutocompleteViewModel {
  private analyticsHandler: AnalyticsHandler;
  private headerAutocompleteStore: HeaderAutocompleteStore;

  constructor(headerAutocompleteStore: HeaderAutocompleteStore) {
    this.analyticsHandler = new AnalyticsHandler();
    this.headerAutocompleteStore = headerAutocompleteStore;
  }

  buttonLabel(): string {
    return 'Search';
  }

  inputPlaceholder(): string {
    return 'Enter make, model or body type';
  }

  inputValue(): string {
    return this.headerAutocompleteStore.inputValue;
  }

  setInputValue(value: string): void {
    this.headerAutocompleteStore.setInputValue(value);
  }

  suggestions(): Suggestions {
    if (this.suggestionsLoading()) {
      return [];
    }
    if (this.headerAutocompleteStore.inventorySuggestions) {
      const suggestions: Suggestions = [];
      this.headerAutocompleteStore.inventorySuggestions.Make.forEach(
        element => {
          suggestions.push({
            group: 'Make',
            label: element,
            make: sanitize(element),
          });
        }
      );
      this.headerAutocompleteStore.inventorySuggestions.Model.forEach(
        element => {
          const tokens = element.split('#');
          const make = sanitize(tokens[0]);
          const model = sanitize(tokens[1]);
          suggestions.push({
            group: 'Model',
            label: element.replace('#', ' '),
            make,
            model,
          });
        }
      );
      this.headerAutocompleteStore.inventorySuggestions.BodyType.forEach(
        element => {
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
      this.headerAutocompleteStore.inventorySuggestionsStatus ===
      Status.FETCHING
    );
  }

  private getTrackProductSearchedCategory(): 'Catalog' | 'Product' | undefined {
    switch (Router.pathname) {
      case '/cars':
      case '/cars/[...params]':
        return 'Catalog';
      case '/inventory':
        return 'Product';
      default:
        return;
    }
  }

  navigateUsingAutocomplete(suggestion: Suggestion): void {
    const trackProductSearchedCategory = this.getTrackProductSearchedCategory();
    if (trackProductSearchedCategory) {
      this.analyticsHandler.trackProductSearched(
        trackProductSearchedCategory,
        'Autocomplete',
        suggestion.label
      );
    }
    const { group } = suggestion;
    const makeAndModelsKey = Filters.MAKE_AND_MODELS;
    const bodyTypeKey = Filters.BODY_TYPES;
    const getFilterData = (): FiltersData => {
      const make = suggestion.make as string;
      const model = suggestion.model as string;
      switch (group) {
        case 'Make':
          return { [makeAndModelsKey]: { [make]: [ALL_KEY] } };
        case 'Model':
          return { [makeAndModelsKey]: { [make]: [model] } };
        default: {
          const bodyType = suggestion.bodyType as string;
          const bodyTypeUrl = (bodyTypes.find(
            body => body.api === bodyType
          ) as BodyType).url;
          return { [bodyTypeKey]: [bodyTypeUrl] };
        }
      }
    };
    updateUrl(getFilterData(), Router);
  }

  navigateUsingSearch(): void {
    const inputValue = this.headerAutocompleteStore.inputValue;
    const trackProductSearchedCategory = this.getTrackProductSearchedCategory();
    if (trackProductSearchedCategory) {
      this.analyticsHandler.trackProductSearched(
        trackProductSearchedCategory,
        'Free Form',
        inputValue
      );
    }
    updateUrl({ [Filters.SEARCH]: inputValue }, Router);
  }
}

export default HeaderAutocompleteViewModel;
