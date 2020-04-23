import { AutocompleteStore } from './store';

// import AnalyticsHandler from 'src/integrations/analytics/AnalyticsHandler';
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
  // private analyticsHandler: AnalyticsHandler;
  private store: AutocompleteStore;

  readonly buttonLabel: string = 'Search';
  readonly inputPlaceholder: string = 'Enter make, model or body type';

  constructor(store: AutocompleteStore) {
    // this.analyticsHandler = new AnalyticsHandler();
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

  navigateUsingAutocomplete(_suggestion: Suggestion): void {
    // this.analyticsHandler.trackProductSearched(
    //   'Home',
    //   'Autocomplete',
    //   suggestion.label
    // );
    // TODO navigate to the appropriate url.
  }

  navigateUsingSearch(): void {
    // const inputValue = this.store.inputValue;
    // this.analyticsHandler.trackProductSearched('Home', 'Free Form', inputValue);
    // TODO navigate to the appropriate url.
  }
}

export default AutocompleteViewModel;
