import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

interface Props {
  isUserLoggedIn: boolean;
  handleClose: any;
  experimentUUID: string;
}

const EmailCapture: React.FC<Props> = ({
  isUserLoggedIn,
  handleClose,
  experimentUUID,
}) => {
  const analyticsHandler = new AnalyticsHandler();
  const viewModel = new ViewModel(analyticsHandler);
  return (
    <View
      handleClose={handleClose}
      experimentUUID={experimentUUID}
      isUserLoggedIn={isUserLoggedIn}
      viewModel={viewModel}
    />
  );
};
