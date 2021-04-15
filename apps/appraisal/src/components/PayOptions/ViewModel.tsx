import { OptionsStore } from '../../modules/options/store';

class PayOptionViewModel {
  private readonly oStore: OptionsStore;
  readonly optionMeta: string[] = ['Direct Deposit', 'Check by Mail'];

  constructor(oStore: OptionsStore) {
    this.oStore = oStore;
  }

  onPayOptionClick = (
    selectedOption: React.MouseEvent<HTMLInputElement, MouseEvent>
  ): void => {
    this.oStore.setPayOptionSelected(selectedOption.currentTarget.value);
  };
}

export default PayOptionViewModel;
