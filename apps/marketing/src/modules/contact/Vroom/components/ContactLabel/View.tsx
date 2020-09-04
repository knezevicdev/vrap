import { styled } from '@material-ui/core/styles';
import { Container, Typography } from '@vroom-web/ui';
import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const StyledContainer = styled(Container)(() => ({
  flexGrow: 1,
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  marginTop: '100px',
  textAlign: 'center',
  [theme.breakpoints.only('xs')]: {
    textAlign: 'center',
  },
  [theme.breakpoints.up('lg')]: {
    marginBottom: theme.spacing(2),
  },
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.body1,
  maxWidth: theme.breakpoints.values.sm,
  textAlign: 'center',
  letterSpacing: '0.25px',
  lineHeight: '1.3',
  margin: 'auto',
}));

const StyledBox = styled(Typography)(() => ({
  textAlign: 'center',
  paddingTop: '10px',
}));

const Contact: React.FC<Props> = ({ viewModel }) => {
  return (
    <StyledContainer>
      <Title variant="h2">{viewModel.title}</Title>
      <StyledBox>
        <SubTitle component="span">
          {viewModel.supportText}
          <strong>{viewModel.phone}</strong>
          {viewModel.speak}
        </SubTitle>
      </StyledBox>
    </StyledContainer>
  );
};

export default Contact;
