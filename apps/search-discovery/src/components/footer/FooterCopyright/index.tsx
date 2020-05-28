import React from 'react';

import FooterCopyrightView from './View';
import FooterCopyrightViewModel from './ViewModel';

const FooterCopyright: React.FC = () => {
  const viewModel = new FooterCopyrightViewModel();
  return <FooterCopyrightView viewModel={viewModel} />;
};

export default FooterCopyright;
