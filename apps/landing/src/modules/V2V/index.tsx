import React, { useContext } from 'react';

import Header from './components/Header';
import { InventoryStoreContext } from './store/inventoryStore';
import View from './View';
import ViewModel from './ViewModel';

import Footer from 'src/core/Footer';

const Vehicle: React.FC = () => {
  const store = useContext(InventoryStoreContext);
  const viewModel = new ViewModel(store);
  return (
    <>
      <Header />
      <View viewModel={viewModel} />
      <Footer />
    </>
  );
};

export default Vehicle;
