import React from 'react';

import View from './View';
import ViewModel from './ViewModel';
import {SellStore} from "./store";

const Sell: React.FC = () => {
    const store = new SellStore();
    const viewModel = new ViewModel(store);
    return <View viewModel={viewModel} />;
};

export default Sell;
