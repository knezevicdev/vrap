import { styled } from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const Container = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const ContainerContent = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: '1280px',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gridGap: '20px',
  padding: theme.spacing(12, 3),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    maxWidth: '680px',
    padding: theme.spacing(6, 3),
  },
}));

const Content = styled('div')(() => ({
  display: 'flex',
}));

const Info = styled('div')(() => ({
  marginLeft: '10px',
}));

const Title = styled(Typography)(() => ({
  fontSize: '20px',
  lineHeight: '20px',
  letterSpacing: '0.25px',
}));

const Description = styled(Typography)(() => ({
  fontSize: '18px',
  lineHeight: '25px',
  letterSpacing: '0.25px',
  marginTop: '4px',
}));

const MarketingInfo: React.FC<Props> = ({ viewModel }) => {
  return (
    <Container>
      <ContainerContent>
        {viewModel.info.map((item) => (
          <Content key={item.title}>
            <CheckCircle color="primary" />
            <Info>
              <Title variant="h2">{item.title}</Title>
              <Description>{item.description}</Description>
            </Info>
          </Content>
        ))}
      </ContainerContent>
    </Container>
  );
};

export default MarketingInfo;
