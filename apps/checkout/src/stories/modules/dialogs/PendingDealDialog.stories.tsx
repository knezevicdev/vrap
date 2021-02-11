import React from 'react';

import PendingDealDialog from '../../../modules/dealValidatorModal/content/PendingDeal';

export const Default = (): JSX.Element => {
  return (
    <PendingDealDialog
      message={`You have placed deposit for another vehicle. Once that purchase is
  complete, you’ll be able to make another purchase. For further
  assistance give us a call at (855) 524-1300`}
    />
  );
};

export default {
  title: 'Checkout/Dialogs/PendingDeal',
};
