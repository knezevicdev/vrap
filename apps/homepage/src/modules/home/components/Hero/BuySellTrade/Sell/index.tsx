import React from 'react';

import View from './View';
import ViewModel from './ViewModel';


const Sell: React.FC = () => {
    const viewModel = new ViewModel();
    return <View viewModel={viewModel} />;
};

export default Sell;
