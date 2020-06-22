import {
  InventorySuggestions,
  InvSearchNetworker,
} from '@vroom-web/inv-search-networking';
import debounce from 'lodash.debounce';
import { action, observable, runInAction } from 'mobx';

import { Status } from '../../networking/types';

// The amount of time a user must stop typing before we get autcomplete options.
const INPUT_DEBOUNCE_WAIT = 400; // milliseconds

export class AutocompleteStore {
  @observable inputValue = '';
  @observable inventorySuggestions?: InventorySuggestions;
  @observable inventorySuggestionsStatus: Status = Status.INITIAL;

  private invSearchNetworker: InvSearchNetworker;

  constructor(invSearchV3Url: string) {
    this.invSearchNetworker = new InvSearchNetworker(invSearchV3Url);
  }

  @action
  getInventorySuggestions = async (input: string): Promise<void> => {
    this.inventorySuggestionsStatus = Status.FETCHING;
    try {
      const response = await this.invSearchNetworker.getInventorySuggestions(
        input
      );
      const inventorySuggestions = response.data;
      runInAction(() => {
        this.inventorySuggestions = inventorySuggestions;
        this.inventorySuggestionsStatus = Status.SUCCESS;
      });
    } catch {
      runInAction(() => {
        this.inventorySuggestions = undefined;
        this.inventorySuggestionsStatus = Status.ERROR;
      });
    }
  };

  private afterSetInputValue = debounce((value: string) => {
    if (value.length > 0) {
      this.getInventorySuggestions(value);
    } else {
      this.clearInventorySuggestions();
    }
  }, INPUT_DEBOUNCE_WAIT);

  @action
  setInputValue = (value: string): void => {
    this.inputValue = value;
    this.afterSetInputValue(value);
  };

  @action
  clearInventorySuggestions = (): void => {
    this.inventorySuggestions = undefined;
    this.inventorySuggestionsStatus = Status.INITIAL;
  };
}
