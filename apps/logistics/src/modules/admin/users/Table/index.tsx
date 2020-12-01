import React from 'react';

import { UsersContext } from '../index';
import UsersModel from '../Model';
import View from './View';
import ViewModel from './ViewModel';

const UsersTable: React.FC = () => (
  <UsersContext.Consumer>
    {(model: UsersModel): JSX.Element => {
      const viewModel = new ViewModel(model);
      return <View viewModel={viewModel} />;
    }}
  </UsersContext.Consumer>
);

export default UsersTable;
