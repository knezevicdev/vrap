import React from 'react';
import View from './View';
import ViewModel from './ViewModel';
import getConfig from 'next/config';
import { PriceStore } from './store';
import { SimpleHeader } from '@vroom-web/header-components';
import { StandardFooter } from '@vroom-web/footer-components';

const { publicRuntimeConfig } = getConfig();
const Price: React.FC = () => {
  const gearboxPrivateUrl = publicRuntimeConfig.GEARBOX_PRIVATE_URL;

  const store = new PriceStore();
	const viewModel = new ViewModel(store);

	return (
    <>
      <SimpleHeader gearboxPrivateUrl={gearboxPrivateUrl} />
      <View viewModel={viewModel} />
      <StandardFooter />
    </>
  )
};

export default Price;
