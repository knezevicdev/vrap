import React from 'react';


import View from './View';
import ViewModel from './ViewModel';
import { InventoryStoreContext, InventoryStore } from 'src/modules/inventory/store';

const Performance: React.FC = () => {
    return (
        <InventoryStoreContext.Consumer>
            {(store: InventoryStore): JSX.Element => {
                const viewModel = new ViewModel(store);
                return <View viewModel={viewModel} />;
            }}
        </InventoryStoreContext.Consumer>
    );
};

export default Performance;
