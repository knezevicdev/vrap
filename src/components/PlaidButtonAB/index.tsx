import { useABSmartly } from '@vroom-web/analytics-integration';
import React from 'react';

import { useOptionsStore } from '../../modules/options/store';
import View from './View';
import ViewModel from './ViewModel';

import { PlaidData } from 'src/interfaces.d';

export type Props = {
  token: string;
  tokenIsLocal: boolean;
  plaidSuccess(
    mutationInput: PlaidData,
    onPlaidSubmitting: (value: boolean) => void
  ): void;
  plaidExit(): void;
  priceId: string;
};

const PlaidButton: React.FC<Props> = ({
  token,
  tokenIsLocal,
  plaidSuccess,
  plaidExit,
  priceId,
}) => {
  const absmartly = useABSmartly();
  const oStore = useOptionsStore();
  const viewModel = new ViewModel(absmartly, oStore);

  return (
    <View
      viewModel={viewModel}
      token={token}
      tokenIsLocal={tokenIsLocal}
      plaidSuccess={plaidSuccess}
      plaidExit={plaidExit}
      priceId={priceId}
    />
  );
};

export default PlaidButton;
