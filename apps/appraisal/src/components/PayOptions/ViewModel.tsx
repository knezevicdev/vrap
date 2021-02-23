import { OptionsStore } from './store';

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

  getPlaidExperimentAssignedExperiment = (): boolean => {
    return this.oStore.plaidExperiment?.assignedVariant === 1;
  }
}

export default PayOptionViewModel;
