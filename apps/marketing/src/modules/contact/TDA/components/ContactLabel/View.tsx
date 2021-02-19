import { styled } from '@material-ui/core/styles';
import { CatData, CatSDK } from '@vroom-web/cat-sdk';
import { Container, Typography } from '@vroom-web/ui';
import React, { useCallback, useEffect, useState } from 'react';

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
  const [phoneNumber, setPhoneNumber] = useState<string>(viewModel.phone);
  const catEventDataListener = useCallback((event: CustomEvent<CatData>) => {
    setPhoneNumber(event.detail.sitePhoneNumber);
  }, []);

  useEffect(() => {
    const catSDK = new CatSDK();
    catSDK.observeCatData(catEventDataListener);
    return () => {
      catSDK.unobserveCatData(catEventDataListener);
    };
  }, [catEventDataListener]);

  return (
    <StyledContainer>
      <Title variant="h2">{viewModel.title}</Title>
      <StyledBox>
        <SubTitle component="span">
          {viewModel.supportText}
          <strong>{phoneNumber}</strong>
          {viewModel.speak}
        </SubTitle>
      </StyledBox>
    </StyledContainer>
  );
};

export default Contact;
