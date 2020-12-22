import { styled } from '@material-ui/core/styles';
import { Button, Typography } from '@vroom-web/ui';
import React from 'react';

import ViewModel from './ViewModel';

const Container = styled('div')(({ theme }) => ({
  background: `linear-gradient(100deg, ${theme.palette.background.paper} 71.9%, ${theme.palette.primary.main} 72%)`,
  [theme.breakpoints.only('xs')]: {
    background: `linear-gradient(170deg, ${theme.palette.background.paper} 71.9%, ${theme.palette.primary.main} 72%)`,
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

const TextWrapper = styled('div')(({ theme }) => ({
  marginRight: theme.spacing(1),
  flexBasis: '60%',
}));

const ImageWrapper = styled('div')(() => ({
  flexBasis: '40%',
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
  whiteSpace: 'pre-line',
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
  whiteSpace: 'pre-line',
  fontSize: '24px',
  lineHeight: '30px',
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    fontSize: '18px',
    lineHeight: '25px',
  },
}));

const ShopNowButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.only('xs')]: {
    marginBottom: theme.spacing(2),
    display: 'none',
  },
}));

const HeroImg = styled('img')(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.only('xs')]: {
    width: '150px',
  },
}));

interface Props {
  viewModel: ViewModel;
}

const HeroView: React.FC<Props> = ({ viewModel }) => {
  return (
    <Container>
      <ContainerContent>
        <TextWrapper>
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
        </TextWrapper>
        <ImageWrapper>
          <HeroImg alt={viewModel.car.alt} src={viewModel.car.src} />
        </ImageWrapper>
      </ContainerContent>
    </Container>
  );
};

export default HeroView;
