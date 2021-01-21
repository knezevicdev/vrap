import React from 'react';

import Model from './Model';
import View from './View';
import ViewModel from './ViewModel';

import { AuthContext, AuthContextInterface } from 'src/components/Auth';

const Shipments: React.FC = () => {
  return (
    <AuthContext.Consumer>
      {(props: AuthContextInterface): JSX.Element => {
        const model = new Model(props.idToken.email);
        const viewModel = new ViewModel(model);
        return <View viewModel={viewModel} />;
      }}
    </AuthContext.Consumer>
  );
};

export default Shipments;
