import InventoryViewModel from './ViewModel';

export interface InventoryProps {
  areFiltersClosed: boolean;
  toggleFiltersState: () => void;
}

export interface InventoryViewsProps extends InventoryProps {
  viewModel: InventoryViewModel;
}
