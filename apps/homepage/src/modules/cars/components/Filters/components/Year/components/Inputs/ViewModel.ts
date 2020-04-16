import { range } from '../../ViewModel';

class InputsViewModel {
  readonly errorLabel: string =
    'Please enter a range of years within 2000-2020';
  readonly leftPlaceholder: string = range.min.toString();
  readonly rightPlaceholder: string = range.max.toString();
}

export default InputsViewModel;
