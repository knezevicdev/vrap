import React from 'react';

import { ContactStoreContext, SubmitContactFormStore } from './store';
import View from './View';
import ViewModel from './ViewModel';

const Vroom: React.FC = () => {
  return (
    <ContactStoreContext.Consumer>
      {(store: SubmitContactFormStore): JSX.Element => {
        const viewModel = new ViewModel(store);
        return <View viewModel={viewModel} />;
      }}
    </ContactStoreContext.Consumer>
  );
};

export default Vroom;
