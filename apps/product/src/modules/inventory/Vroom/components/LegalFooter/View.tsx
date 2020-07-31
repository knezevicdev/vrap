import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import ViewModel from './ViewModel';

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  margin: theme.spacing(0, 'auto', 8, 'auto'),
  width: '100%',
  maxWidth: '1232px',
  padding: theme.spacing(0, 3),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: '13px',
  letterSpacing: '0.35px',
  color: theme.palette.grey['600'],
}));

interface Props {
  viewModel: ViewModel;
}

const LegalFooterView: React.FC<Props> = ({ viewModel }) => {
  return (
    <Container>
      <StyledTypography>{viewModel.legalText}</StyledTypography>
    </Container>
  );
};

export default LegalFooterView;
