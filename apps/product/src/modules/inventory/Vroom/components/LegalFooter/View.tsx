import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import ViewModel from './ViewModel';

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: theme.spacing(0, 'auto', 8, 'auto'),
  width: '100%',
  maxWidth: '1232px',
  padding: theme.spacing(0, 3),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: '13px',
  letterSpacing: '0.35px',
  paddingBottom: theme.spacing(2),
}));

interface Props {
  viewModel: ViewModel;
}

const LegalFooterView: React.FC<Props> = ({ viewModel }) => {
  return (
    <Container>
      <StyledTypography>{viewModel.legalText[0]}</StyledTypography>
      <StyledTypography>{viewModel.legalText[1]}</StyledTypography>
    </Container>
  );
};

export default LegalFooterView;
