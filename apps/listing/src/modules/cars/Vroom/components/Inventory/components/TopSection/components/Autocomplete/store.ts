import { InvSearchNetworker } from '@vroom-web/inv-search-networking';
import debounce from 'lodash.debounce';
import { action, makeObservable, observable, runInAction } from 'mobx';
import getConfig from 'next/config';

import { Status } from 'src/networking/types';

const { publicRuntimeConfig } = getConfig();

export interface InventorySuggestions {
  BodyType: string[];
  Make: string[];
  Model: string[];
}

// The amount of time a user must stop typing before we get autcomplete options.
const INPUT_DEBOUNCE_WAIT = 400; // milliseconds

export class AutocompleteStore {
  @observable inputValue = '';
  @observable inventorySuggestions?: InventorySuggestions;
  @observable inventorySuggestionsStatus: Status = Status.INITIAL;

  private invSearchNetworker: InvSearchNetworker;

  constructor() {
    this.invSearchNetworker = new InvSearchNetworker(
      publicRuntimeConfig.INVSEARCH_V3_URL
    );
    makeObservable(this);
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
