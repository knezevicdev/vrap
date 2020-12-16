import React, { createContext } from 'react';

import SignupModel from './Model';
import View from './View';
import ViewModel from './ViewModel';

export const SignupContext = createContext<SignupModel>(new SignupModel());

const Signup: React.FC = () => {
  return (
    <SignupContext.Consumer>
      {(model: SignupModel): JSX.Element => {
        const viewModel = new ViewModel(model);
        return <View viewModel={viewModel} />;
      }}
    </SignupContext.Consumer>
  );
};

export default Signup;
