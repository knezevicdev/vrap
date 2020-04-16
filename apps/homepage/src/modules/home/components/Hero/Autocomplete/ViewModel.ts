import Router from 'next/router';

import { Filters, FiltersData } from '../../../../cars/util';
import { AutocompleteStore } from './store';

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

class AutocompleteViewModel {
  private analyticsHandler: AnalyticsHandler;
  private store: AutocompleteStore;

  readonly buttonLabel: string = 'Search';
  readonly inputPlaceholder: string = 'Enter make, model or body type';

  constructor(store: AutocompleteStore) {
    this.analyticsHandler = new AnalyticsHandler();
    this.store = store;
  }

  inputValue(): string {
    return this.store.inputValue;
  }

  setInputValue(value: string): void {
    this.store.setInputValue(value);
  }

  suggestions(): Suggestions {
    if (this.suggestionsLoading()) {
      return [];
    }
    if (this.store.inventorySuggestions) {
      const suggestions: Suggestions = [];
      this.store.inventorySuggestions.Make.forEach(element => {
        suggestions.push({
          group: 'Make',
          label: element,
          make: sanitize(element),
        });
      });
      this.store.inventorySuggestions.Model.forEach(element => {
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
      this.store.inventorySuggestions.BodyType.forEach(element => {
        suggestions.push({
          group: 'Body Type',
          label: element,
          bodyType: element,
        });
      });
      return suggestions;
    }
    return [];
  }

  suggestionsLoading(): boolean {
    return this.store.inventorySuggestionsStatus === Status.FETCHING;
  }

  navigateUsingAutocomplete(suggestion: Suggestion): void {
    this.analyticsHandler.trackProductSearched(
      'Home',
      'Autocomplete',
      suggestion.label
    );
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
    const inputValue = this.store.inputValue;
    this.analyticsHandler.trackProductSearched('Home', 'Free Form', inputValue);
    updateUrl({ [Filters.SEARCH]: inputValue }, Router);
  }
}

export default AutocompleteViewModel;
