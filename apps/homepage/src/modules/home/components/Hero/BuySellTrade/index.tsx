import React from 'react';

import View from './View';
import ViewModel from './ViewModel';
import {BuySellTradeStore} from "./store";


const BuySellTrade: React.FC = () => {
    const store = new BuySellTradeStore();
    const viewModel = new ViewModel(store);
    return <View viewModel={viewModel} />;
};

export default BuySellTrade;
