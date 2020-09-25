import React from 'react';
import View from './View';
import ViewModel from './ViewModel';
import getConfig from 'next/config';
import { PriceStore, getInitialPriceStoreState } from './store';
import { SimpleHeader } from '@vroom-web/header-components';
import { StandardFooter } from '@vroom-web/footer-components';

const { publicRuntimeConfig } = getConfig();

const Price: NextPage<Props> = ({
  initialState,
}) => {
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

Price.getInitialProps = async ({ query }): Promise<Props> => {
  const offerId = query.offerId as string;
  const initialState = await getInitialDeliveryOrderStoreState(offerId);

  return { initialState };
};

export default Price;
