import { styled } from '@material-ui/core/styles';
import { Button, Typography } from '@vroom-web/ui';
import React from 'react';

import ViewModel from './ViewModel';

const Container = styled('div')(({ theme }) => ({
  background: `linear-gradient(100deg, ${theme.palette.background.default} 71.9%, ${theme.palette.primary.main} 72%)`,
  [theme.breakpoints.only('xs')]: {
    background: `linear-gradient(170deg, ${theme.palette.background.default} 71.9%, ${theme.palette.primary.main} 72%)`,
  },
}));

const ContainerContent = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: '1280px',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(10, 6),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 3),
  },
  [theme.breakpoints.only('xs')]: {
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

const TagLine = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  textTransform: 'uppercase',
  fontSize: '18px',
  lineHeight: '16px',
  letterSpacing: '1px',
  marginBottom: theme.spacing(3),
  [theme.breakpoints.only('sm')]: {
    marginBottom: theme.spacing(2),
  },
  [theme.breakpoints.only('xs')]: {
    marginBottom: theme.spacing(1),
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '16px',
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '62px',
  lineHeight: '66px',
  textTransform: 'uppercase',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.only('sm')]: {
    fontSize: '42px',
    lineHeight: '42px',
  },
  [theme.breakpoints.only('xs')]: {
    fontSize: '36px',
    lineHeight: '36px',
  },
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  lineHeight: '30px',
  marginBottom: theme.spacing(4),
  [theme.breakpoints.only('xs')]: {
    marginBottom: theme.spacing(2),
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '18px',
    lineHeight: '25px',
  },
}));

const ShopNowButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('xs')]: {
    display: 'none',
  },
}));

const HeroImgWrapper = styled('div')(() => ({
  textAlign: 'center',
  width: '50%',
  height: 'auto',
}));

const HeroImg = styled('img')(() => ({
  width: '85%',
}));

interface Props {
  viewModel: ViewModel;
}

const HeroView: React.FC<Props> = ({ viewModel }) => {
  return (
    <Container>
      <ContainerContent>
        <div>
          <TagLine>{viewModel.tagline}</TagLine>
          <Title variant="h1">{viewModel.title}</Title>
          <SubTitle>{viewModel.subtitle} </SubTitle>
          <ShopNowButton
            variant="contained"
            color="primary"
            href={viewModel.carsLink}
          >
            {viewModel.buttonLabel}
          </ShopNowButton>
        </div>
        <HeroImgWrapper>
          <HeroImg alt={viewModel.car.alt} src={viewModel.car.src} />
        </HeroImgWrapper>
      </ContainerContent>
    </Container>
  );
};

export default HeroView;
