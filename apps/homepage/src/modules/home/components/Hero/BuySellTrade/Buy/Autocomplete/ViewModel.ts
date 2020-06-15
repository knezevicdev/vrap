import { AutocompleteStore } from './store';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
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

  readonly buttonLabel: string = 'Find your car';
  readonly inputPlaceholder: string = 'Enter make, model or body style';

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
      this.store.inventorySuggestions.Make.forEach((element) => {
        suggestions.push({
          group: 'Make',
          label: element,
          make: element,
        });
      });
      this.store.inventorySuggestions.Model.forEach((element) => {
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
      this.store.inventorySuggestions.BodyType.forEach((element) => {
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
      'Autocomplete',
      suggestion.label
    );

    if (suggestion.group === 'Body Type') {
      if (!suggestion.bodyType) {
        return;
      }
      const bodyType =
        suggestion.bodyType === 'Van Minivan'
          ? 'minivan'
          : suggestion.bodyType.toLowerCase();
      window.location.href = `/catalog/all-years/all-makes/${bodyType}`;
      return;
    }

    if (suggestion.group === 'Make') {
      if (!suggestion.make) {
        return;
      }
      const make = suggestion.make.toLowerCase().replace(/[\s-]/g, '_');
      window.location.href = `/catalog/all-years/${make}`;
      return;
    }

    if (suggestion.group === 'Model') {
      if (!suggestion.make || !suggestion.model) {
        return;
      }
      const make = suggestion.make.toLowerCase().replace(/[\s-]/g, '_');
      const model = suggestion.model.toLowerCase().replace(/[\s-]/g, '_');
      window.location.href = `/catalog/all-years/${make}_${model}`;
      return;
    }
  }

  navigateUsingSearch(): void {
    const inputValue = this.store.inputValue;
    this.analyticsHandler.trackProductSearched('Free Form', inputValue);
    window.location.href = `/catalog?search=${inputValue}`;
  }
}

export default AutocompleteViewModel;
