import { useMediaQuery } from '@material-ui/core';
import { styled, useTheme } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import BuySellTrade from './BuySellTrade';
import ViewModel from './ViewModel';

const Container = styled('div')(() => ({
  position: 'relative',
}));

const Content = styled('div')(({ theme }) => ({
  zIndex: 1,
  position: 'absolute',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '32px',
  width: '100%',
  height: '100%',
  padding: theme.spacing(12),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(8, 3),
  },
  [theme.breakpoints.down('xs')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2),
  whiteSpace: 'pre-line',
  [theme.breakpoints.down('xs')]: {
    marginBottom: theme.spacing(1),
  },
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '18px',
  lineHeight: '24px',
  letterSpacing: '0.25px',
  [theme.breakpoints.down('xs')]: {
    whiteSpace: 'pre-line',
  },
}));

const Video = styled('video')(({ theme }) => ({
  objectFit: 'cover',
  width: '100%',
  height: '598px',
  [theme.breakpoints.down('sm')]: {
    height: '411px',
    objectPosition: '35% 50%',
  },
}));

interface Props {
  viewModel: ViewModel;
}

const HeroView: React.FC<Props> = ({ viewModel }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const { title, subtitle, bgVideo } = viewModel;
  return (
    <>
      <Container>
        <Content>
          <div>
            <Title variant="h1">{title}</Title>
            <SubTitle fontWeight={600}>{subtitle}</SubTitle>
          </div>
          {!isMobile && <BuySellTrade />}
        </Content>
        <Video
          playsInline
          autoPlay
          muted
          loop
          poster={bgVideo.poster}
          id="bgvid"
        >
          <source src={bgVideo.src} type="video/mp4" />
        </Video>
      </Container>
      {isMobile && <BuySellTrade />}
    </>
  );
};

export default observer(HeroView);
