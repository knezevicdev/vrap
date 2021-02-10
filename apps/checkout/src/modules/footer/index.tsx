import React, { FC } from 'react';
import ViewModel from './ViewModel';
import View from "./View";

const Footer: FC = () => {
  const viewModel = new ViewModel();

  return <View viewModel={viewModel}/>;
};

export default Footer;
