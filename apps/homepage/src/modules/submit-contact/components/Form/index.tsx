import React from 'react';

import { SubmitContactStore, SubmitContactStoreContext } from '../../store';
import { SubmitContactFormStore } from './store';
import View from './View';
import ViewModel from './ViewModel';

const Form: React.FC = () => {
  return (
    <SubmitContactStoreContext.Consumer>
      {(submitContactStore: SubmitContactStore): JSX.Element => {
        const submitContactFormStore = new SubmitContactFormStore();
        const viewModel = new ViewModel(
          submitContactStore,
          submitContactFormStore
        );
        return <View viewModel={viewModel} />;
      }}
    </SubmitContactStoreContext.Consumer>
  );
};

export default Form;
