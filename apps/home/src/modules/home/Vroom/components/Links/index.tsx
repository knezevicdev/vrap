import React from 'react';

import { LinksMakeView, LinksModelView, LinksTypeView } from './View';
import ViewModel from './ViewModel';

const LinksType: React.FC = () => {
  const viewModel = new ViewModel();
  return <LinksTypeView viewModel={viewModel} />;
};

const LinksMake: React.FC = () => {
  const viewModel = new ViewModel();
  return <LinksMakeView viewModel={viewModel} />;
};

const LinksModel: React.FC = () => {
  const viewModel = new ViewModel();
  return <LinksModelView viewModel={viewModel} />;
};

export { LinksType, LinksMake, LinksModel };
