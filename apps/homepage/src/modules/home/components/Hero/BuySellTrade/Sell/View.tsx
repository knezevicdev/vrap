import React from 'react';
import {observer} from "mobx-react";
import ViewModel from './ViewModel';

interface Props {
    viewModel: ViewModel;
}


const SellView: React.FC<Props> = () => {
    return (
        <div>SELL</div>
    )
};

export default observer(SellView);
