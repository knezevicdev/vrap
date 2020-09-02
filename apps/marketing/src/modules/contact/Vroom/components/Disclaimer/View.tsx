import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const StyledContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  maxWidth: '900px',
  margin: 'auto',
  marginBottom: theme.spacing(4),
  padding: '24px',
}));

const Text = styled(Typography)(({ theme }) => ({
  ...theme.typography.caption,
  marginBottom: theme.spacing(2),
  textAlign: 'center',
  letterSpacing: '0.25px',
  lineHeight: '1.3',
}));

const DisclaimerView: React.FC<Props> = ({ viewModel }) => {
  return (
    <StyledContainer>
      <Text component="span">{viewModel.disclaimerText}</Text>
      <Link href={viewModel.privacylink.href} variant="caption">
        {viewModel.privacylink.label}
      </Link>
      <Text component="span">{viewModel.and}</Text>
      <Link href={viewModel.termslink.href} variant="caption">
        {viewModel.termslink.label}
      </Link>
    </StyledContainer>
  );
};

export default DisclaimerView;
