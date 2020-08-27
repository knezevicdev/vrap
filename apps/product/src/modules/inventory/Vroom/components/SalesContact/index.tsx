import View from './View';
import ViewModel from './ViewModel';

const SalesContact = () => {
  const viewModel = new ViewModel();
  return <View viewModel={viewModel} />;
};

export default SalesContact;
