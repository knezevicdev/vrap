import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
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
  color: theme.palette.grey['600'],
  paddingBottom: theme.spacing(1),
}));

interface Props {
  viewModel: ViewModel;
}

const LegalFooterView: React.FC<Props> = ({ viewModel }) => {
  return (
    <Container>
      {viewModel.getLegalText().map((item: string) => {
        return <StyledTypography key={item}>{item}</StyledTypography>;
      })}
    </Container>
  );
};

export default observer(LegalFooterView);
