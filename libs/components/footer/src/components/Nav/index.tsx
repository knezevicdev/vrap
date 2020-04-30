import React from 'react';

import DesktopView from './DesktopView';
import MobileView from './MobileView';
import ViewModel from './ViewModel';

export const MobileNav: React.FC = () => {
  const viewModel = new ViewModel();
  return <MobileView viewModel={viewModel} />;
};

export const DesktopNav: React.FC = () => {
  const viewModel = new ViewModel();
  return <DesktopView viewModel={viewModel} />;
};
