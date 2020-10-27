import React from 'react';
import ViewModel from './ViewModel';
import { styled } from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';
import { Typography } from '@vroom-web/ui';

interface Props {
  viewModel: ViewModel;
}

const SuperCenterContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const SuperCenterContent = styled('div')(({ theme }) => ({
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
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

const Content = styled('div')(() => ({
  display: 'flex',
}));

const Info = styled('div')(() => ({
  marginLeft: '10px',
}));
const Title = styled(Typography)(() => ({
  fontSize: '24px',
  lineHeight: '24px',
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
    <SuperCenterContainer>
      <SuperCenterContent>
        {viewModel.info.map((item) => (
          <Content>
            <CheckCircle color="primary" />
            <Info>
              <Title variant="h2">{item.title}</Title>
              <Description>{item.description}</Description>
            </Info>
          </Content>
        ))}
      </SuperCenterContent>
    </SuperCenterContainer>
  );
};

export default MarketingInfo;
