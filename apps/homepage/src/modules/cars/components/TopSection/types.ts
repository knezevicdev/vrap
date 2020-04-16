import TopSectionViewModel from './ViewModel';

export interface TopSectionProps {
  areFiltersClosed: boolean;
  toggleFiltersState: () => void;
}

export interface TopSectionViewProps extends TopSectionProps {
  viewModel: TopSectionViewModel;
}
