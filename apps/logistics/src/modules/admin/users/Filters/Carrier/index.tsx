import React from 'react';

import { UsersContext } from '../../index';
import UsersModel from '../../Model';
import Model from './Model';
import View from './View';
import ViewModel from './ViewModel';

const Autocomplete: React.FC = () => {
  return (
    <UsersContext.Consumer>
      {(usersModel: UsersModel): JSX.Element => {
        const model = new Model();
        const viewModel = new ViewModel(model, usersModel);
        return <View viewModel={viewModel} />;
      }}
    </UsersContext.Consumer>
  );
};

export default Autocomplete;
