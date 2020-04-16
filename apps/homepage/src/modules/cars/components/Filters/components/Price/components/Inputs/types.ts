import { MaxAndMin } from '../../../../../../util';
import InputsViewModel from './ViewModel';

export interface InputsProps {
  state: string[] | undefined;
  onDone: (values: MaxAndMin) => void;
}

export interface InputsViewProps extends InputsProps {
  viewModel: InputsViewModel;
}
