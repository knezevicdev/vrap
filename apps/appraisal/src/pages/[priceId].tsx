import React from 'react';
import View from '../modules/price/View';
import ViewModel from '../modules/price/ViewModel';
import getConfig from 'next/config';
import { NextPage } from 'next';
import { PriceStore, PriceStoreState, getInitialPriceStoreState } from '../modules/price/store';
import { SimpleHeader } from '@vroom-web/header-components';
import { StandardFooter } from '@vroom-web/footer-components';

const { publicRuntimeConfig } = getConfig();

interface Props {
  initialState: PriceStoreState;
}

const Price: NextPage = () => {
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
  // e93bafe0b739241f875d1e3c35416fff
  const priceId = query.priceId as string;
  console.log({priceId});
  const initialState = await getInitialPriceStoreState(priceId);

  return { initialState };
};

export default Price;
