import React from 'react';

import View from './View';
import ViewModel from './ViewModel';
import {VinStore} from "./store";

const Vin: React.FC = () => {
    const store = new VinStore();
    const viewModel = new ViewModel(store);
    return <View viewModel={viewModel} />;
};

export default Vin;
