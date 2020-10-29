import { styled, Theme } from '@material-ui/core';
import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const Container = styled('div')(({ theme }) => ({
  position: 'relative',
  height: '390px',
  [theme.breakpoints.down('md')]: {
    height: '242px',
  },
  [theme.breakpoints.down('xs')]: {
    height: '203px',
    marginBottom: '143px',
  },
}));
const Inner = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  zIndex: 2,
  background:
    'linear-gradient(100deg, rgb(231, 19, 26) 41.9%, rgba(0, 0, 0, 0) 42%)',
  [theme.breakpoints.down('md')]: {
    background:
      'linear-gradient(100deg, rgb(231, 19, 26) 50.9%, rgba(0, 0, 0, 0) 51%)',
  },
  [theme.breakpoints.down('xs')]: {
    bottom: '-143px',
    top: 'initial',
    background: 'rgb(231, 19, 26)',
    height: 'auto',
  },
}));

const TextContainer = styled('div')(({ theme }) => ({
  zIndex: 3,
  maxWidth: '400px',
  position: 'absolute',
  top: '75px',
  left: '50px',
  [theme.breakpoints.down('md')]: {
    top: '30px',
    left: '20px',
  },
  [theme.breakpoints.down('xs')]: {
    margin: '25px 0',
    marginBottom: '40px',
    textAlign: 'center',
    position: 'initial',
    maxWidth: 'none',
  },
}));

const Title = styled('div')(() => ({
  fontSize: '14px',
  fontFamily: 'Calibre',
  letterSpacing: '1.25px',
  textTransform: 'uppercase',
  color: 'rgb(255, 255, 255)',
  marginBottom: '20px',
}));

const LocationTitle = styled('div')(({ theme }) => ({
  fontSize: '62px',
  fontFamily: 'RingsideCompressed',
  letterSpacing: '1.25px',
  textTransform: 'uppercase',
  color: 'rgb(255, 255, 255)',
  [theme.breakpoints.down('md')]: {
    fontSize: '36px',
  },
}));

const BackgroundImage = styled('div')(
  (props: { theme: Theme; src: string }) => ({
    position: 'absolute',
    right: '0px',
    backgroundImage: `url(${props.src})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    cursor: 'pointer',
    height: '100%',
    width: '63%',
    zIndex: 1,

    [props.theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  })
);

const Hero: React.FC<Props> = ({ viewModel }) => {
  return (
    <Container>
      <Inner>
        <TextContainer>
          <Title>{viewModel.title}</Title>
          <LocationTitle>{viewModel.locationName}</LocationTitle>
        </TextContainer>
      </Inner>
      <BackgroundImage src={viewModel.imgUrl} />
    </Container>
  );
};

export default Hero;
