interface ConstructorData {
  invSearchV3Url: string;
}

class AutocompleteDialogViewModel {
  readonly cancelLabel: string = 'Cancel';
  readonly invSearchV3Url: string;

  constructor(constructorData: ConstructorData) {
    this.invSearchV3Url = constructorData.invSearchV3Url;
  }
}

export default AutocompleteDialogViewModel;
