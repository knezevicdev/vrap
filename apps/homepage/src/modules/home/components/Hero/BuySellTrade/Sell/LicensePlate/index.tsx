import React from 'react';

import View from './View';
import ViewModel from './ViewModel';
import {LicensePlateStore} from "./store";

const LicensePlate: React.FC = () => {
    const store = new LicensePlateStore();
    const viewModel = new ViewModel(store);
    return <View viewModel={viewModel} />;
};

export default LicensePlate;
