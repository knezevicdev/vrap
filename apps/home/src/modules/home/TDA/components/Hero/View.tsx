import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import getConfig from 'next/config';
import React from 'react';

import BuySellTrade from './BuySellTrade';
import ViewModel from './ViewModel';

const { publicRuntimeConfig } = getConfig();

const ViewContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  margin: theme.spacing(0, 'auto'),
  width: '100%',
  backgroundImage: `url(${publicRuntimeConfig.BASE_PATH}/modules/home/tda/images/tda_hero.jpg)`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

const ViewContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: theme.spacing(16, 8, 24, 8),
  maxWidth: '1280px',
  margin: '0 auto',
  [theme.breakpoints.only('sm')]: {
    padding: theme.spacing(12, 4, 12, 4),
  },
  [theme.breakpoints.only('xs')]: {
    padding: theme.spacing(8, 2),
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  whiteSpace: 'pre',
  color: '#FFFFFF',
  lineHeight: '56px',
  fontSize: '48px',
  fontWeight: 600,
  fontFamily: 'RingsideCompressed',
  wordBreak: 'break-all',
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    fontSize: '42px',
    lineHeight: '48px',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '36px',
    lineHeight: '40px',
    marginBottom: theme.spacing(2),
  },
}));

interface Props {
  viewModel: ViewModel;
}

const View: React.FC<Props> = ({ viewModel }) => {
  return (
    <ViewContainer>
      <ViewContent>
        <Title>{viewModel.title}</Title>
        <BuySellTrade />
      </ViewContent>
    </ViewContainer>
  );
};

export default View;
