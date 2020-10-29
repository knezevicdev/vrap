import { styled, Theme, Typography, Link } from '@material-ui/core';
import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const Container = styled('div')(() => ({
  position: 'relative',
}));

const InnerContainer = styled('div')(({ theme }) => ({
  background:
    'linear-gradient(100deg, rgb(231, 19, 26) 41.9%, rgba(0, 0, 0, 0) 42%)',
  [theme.breakpoints.only('xs')]: {
    marginTop: '200px',
    background: 'rgb(231, 19, 26)',
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

const TextContainer = styled('div')(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const BackgroundImage = styled('div')(
  (props: { theme: Theme; src: string }) => ({
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundImage: `url(${props.src})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    cursor: 'pointer',
    height: '100%',
    width: '63%',
    zIndex: -1,

    [props.theme.breakpoints.only('xs')]: {
      zIndex: 0,
      left: '-40px',
      height: '200px',
      width: '110%',
    },
  })
);

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

const Hero: React.FC<Props> = ({ viewModel }) => {
  return (
    <Container>
      <Link href={viewModel.googleMapsUrl}>
        <InnerContainer>
          <ContainerContent>
            <TextContainer>
              <TagLine>{viewModel.tagline}</TagLine>
              <Title variant="h1">{viewModel.locationName}</Title>
              <SubTitle>{viewModel.subtitle} </SubTitle>
            </TextContainer>
          </ContainerContent>
        </InnerContainer>
        <BackgroundImage src={viewModel.imgUrl} />
      </Link>
    </Container>
  );
};

export default Hero;
