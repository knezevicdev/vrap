import FiltersViewModel from './ViewModel';

export interface FiltersProps {
  areFiltersOpen: boolean;
  toggleFiltersState: () => void;
}

export interface FiltersViewProps extends FiltersProps {
  viewModel: FiltersViewModel;
}
