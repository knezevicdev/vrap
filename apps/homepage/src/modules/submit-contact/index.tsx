import React from 'react';

import { SubmitContactStore, SubmitContactStoreContext } from './store';
import View from './View';
import ViewModel from './ViewModel';

const SubmitContact: React.FC = () => {
  return (
    <SubmitContactStoreContext.Consumer>
      {(store: SubmitContactStore): JSX.Element => {
        const viewModel = new ViewModel(store);
        return <View viewModel={viewModel} />;
      }}
    </SubmitContactStoreContext.Consumer>
  );
};

export default SubmitContact;
