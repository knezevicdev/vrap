import { styled } from '@material-ui/core/styles';
import { Container, Typography } from '@vroom-web/ui';
import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
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

const ContactCompletion: React.FC<Props> = ({ viewModel }) => {
  return (
    <Container>
      <Title variant="h2">{viewModel.thanks}</Title>
      <SubTitle>{viewModel.supportText}</SubTitle>
      <StyledBox>
        <SubTitle component="span">
          {viewModel.needTalk}
          <strong>{viewModel.phoneNumber}</strong>
          {viewModel.call}
        </SubTitle>
      </StyledBox>
    </Container>
  );
};

export default ContactCompletion;
