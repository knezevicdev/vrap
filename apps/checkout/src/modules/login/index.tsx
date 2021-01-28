import React, { FC } from 'react';

import View from './View';
import ViewModel from './ViewModel';

const Login: FC = () => {
  const viewModel = new ViewModel();
  return <View viewModel={viewModel}></View>;
};

export default Login;
