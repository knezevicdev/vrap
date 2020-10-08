import { observer } from 'mobx-react';
import React from 'react';

import Nav from '../../components/Nav';
import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const HeaderNav: React.FC<Props> = ({ viewModel }) => {
  return (
    <Nav
      desktopLinks={viewModel.desktopLinks()}
      mobileLinks={viewModel.mobileLinks()}
    />
  );
};

export default observer(HeaderNav);
