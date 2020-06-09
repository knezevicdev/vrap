import React from 'react';
import {observer} from "mobx-react";
import ViewModel from './ViewModel';

interface Props {
    viewModel: ViewModel;
}


const BuyView: React.FC<Props> = () => {
    return (
        <div>BUY</div>
    )
};

export default observer(BuyView);
