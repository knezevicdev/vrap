import React from 'react';
import { withDesign } from 'storybook-addon-designs';

import {
  initialProps,
  propsWhenDepositCaptured,
  propsWithAdditionalProductsNotSelected,
  propsWithAdditionalProductsSelected,
  propsWithFinancing,
  propsWithTrade,
  propsWithTradeNoBalance,
} from './ViewModel';

import DealCard from 'src/modules/deals/sections/DealSummary/DealCard';

export const Initial = (): JSX.Element => {
  return <DealCard {...initialProps} />;
};

export const FNIProductsSelected = (): JSX.Element => {
  return <DealCard {...propsWithAdditionalProductsSelected} />;
};

export const FNIProductsNotSelected = (): JSX.Element => {
  return <DealCard {...propsWithAdditionalProductsNotSelected} />;
};

export const Trade = (): JSX.Element => {
  return <DealCard {...propsWithTrade} />;
};

export const TradeAndNoBalance = (): JSX.Element => {
  return <DealCard {...propsWithTradeNoBalance} />;
};

export const Financing = (): JSX.Element => {
  return <DealCard {...propsWithFinancing} />;
};

export const NoDepositDue = (): JSX.Element => {
  return <DealCard {...propsWhenDepositCaptured} />;
};

export default {
  title: 'Checkout/DealCard',
  decorators: [withDesign],
};
