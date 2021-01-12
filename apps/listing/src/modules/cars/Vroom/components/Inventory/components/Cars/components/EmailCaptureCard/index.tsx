import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Car } from '@vroom-web/inv-search-networking';
import React, { useState } from 'react';

import DesktopView from './DesktopView';
import LoadingCard from './Loading';
import MobileView from './MobileView';
import EmailCaptureCardViewModel from './ViewModel';

interface EmailCaptureCardProps {
  car: Car | undefined;
}

const EmailCaptureCard: React.FC<EmailCaptureCardProps> = ({ car }) => {
  const [email, setEmail] = useState('');
  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));
  const xlUp = useMediaQuery(theme.breakpoints.up('xl'));

  if (!car) {
    return <LoadingCard mobile={xsDown} xl={xlUp} />;
  }
  const viewModel = new EmailCaptureCardViewModel(email, setEmail);
  if (xsDown) {
    return <MobileView viewModel={viewModel} />;
  }
  return <DesktopView viewModel={viewModel} />;
};

export default EmailCaptureCard;
