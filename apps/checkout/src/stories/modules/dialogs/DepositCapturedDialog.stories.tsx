import React from 'react';

import { dialogDecorator } from './dialogDecorator';

import PendingDealDepositCaptured from 'src/modules/dealValidator/content/PendingDealDepositCaptured';
import { DialogTypeEnum } from 'src/modules/dealValidator/types';
import { dialogInnerContent } from 'src/modules/dealValidator/ViewModel';

export const Default = (): JSX.Element => {
  const dialogAction = (dialogType: DialogTypeEnum): void => {
    console.log('dialogType', dialogType);
  };
  const { title, contentMsg } = dialogInnerContent(
    DialogTypeEnum.DEPOSIT_CAPTURED
  );

  return (
    <PendingDealDepositCaptured
      dialogAction={dialogAction}
      title={title ?? ''}
      contentMsg={contentMsg ?? ''}
      dialogType={DialogTypeEnum.DEPOSIT_CAPTURED}
    />
  );
};

export default {
  title: 'Checkout/Dialogs/Deposit Captured',
  decorators: [dialogDecorator],
};
