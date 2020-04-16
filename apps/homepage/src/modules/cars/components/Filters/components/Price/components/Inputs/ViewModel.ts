import { MaxAndMin } from '../../../../../../util';
import { range } from '../../ViewModel';

class InputsViewModel {
  readonly errorLabel: string = 'Please enter prices within $4,000 - $125,000';
  readonly leftPlaceholder: string = range.min.toString();
  readonly rightPlaceholder: string = range.max.toString();

  getRange = (): MaxAndMin => {
    return { min: range.min, max: range.max };
  };
}

export default InputsViewModel;
