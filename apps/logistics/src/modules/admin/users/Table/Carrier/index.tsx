import React from 'react';

import { UsersContext } from '../../index';
import UsersModel from '../../Model';
import Model from './Model';
import View from './View';
import ViewModel from './ViewModel';

interface Props {
  userId: number;
  carrierName: string;
}

const Autocomplete: React.FC<Props> = ({ userId, carrierName }) => {
  return (
    <UsersContext.Consumer>
      {(usersModel: UsersModel): JSX.Element => {
        const model = new Model(userId, carrierName);
        const viewModel = new ViewModel(model, usersModel);
        return <View viewModel={viewModel} />;
      }}
    </UsersContext.Consumer>
  );
};

export default Autocomplete;
