import InputsViewModel from './ViewModel';

export interface InputsProps {
  state: string[] | undefined;
  onDone: (values: number[]) => void;
}

export interface InputsViewProps extends InputsProps {
  viewModel: InputsViewModel;
}
