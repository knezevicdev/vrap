import React from 'react';

import { UsersContext } from '../index';
import UsersModel from '../Model';
import View from './View';
import ViewModel from './ViewModel';

const CreateAccount: React.FC = () => {
  return (
    <UsersContext.Consumer>
      {(usersModel: UsersModel): JSX.Element => {
        const viewModel = new ViewModel(usersModel);
        return <View viewModel={viewModel} />;
      }}
    </UsersContext.Consumer>
  );
};

export default CreateAccount;
