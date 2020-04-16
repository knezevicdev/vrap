import ModelsViewModel from './ViewModel';

export interface ModelsProps {
  make: string;
  models: string[];
}

export interface ModelsViewProps {
  models: string[];
  viewModel: ModelsViewModel;
}
