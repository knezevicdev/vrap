import React from 'react';

import FooterNavView from './View';
import FooterNavViewModel from './ViewModel';

const FooterNav: React.FC = () => {
  const viewModel = new FooterNavViewModel();
  return <FooterNavView viewModel={viewModel} />;
};

export default FooterNav;
