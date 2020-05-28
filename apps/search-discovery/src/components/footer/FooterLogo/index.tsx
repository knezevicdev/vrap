import React from 'react';

import FooterLogoView from './View';
import FooterLogoViewModel from './ViewModel';

const FooterNav: React.FC = () => {
  const viewModel = new FooterLogoViewModel();
  return <FooterLogoView viewModel={viewModel} />;
};

export default FooterNav;
