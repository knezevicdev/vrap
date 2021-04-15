import { styled } from '@material-ui/core/styles';
import { Button, Container, Typography } from '@vroom-web/ui';
import getConfig from 'next/config';
import React from 'react';

import ViewModel from './ViewModel';

const { publicRuntimeConfig } = getConfig();

const Background = styled('div')({
  position: 'relative',
});

const BackgroundImg = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'top',
  position: 'absolute',
  zIndex: -1,
});

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('sm')]: {
    alignItems: 'center',
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textAlign: 'center',
  marginBottom: theme.spacing(1),
  [theme.breakpoints.up('md')]: {
    marginBottom: theme.spacing(2),
  },
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  letterSpacing: '0.25px',
  lineHeight: '20px',
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  maxWidth: theme.breakpoints.values.sm,
  [theme.breakpoints.up('md')]: {
    lineHeight: '30px',
  },
}));

const StyledButton = styled(Button)(() => ({
  minWidth: '180px',
}));

interface Props {
  viewModel: ViewModel;
}

const WhoWeAreView: React.FC<Props> = ({ viewModel }) => {
  const onClick = (): void => {
    viewModel.learnMoreClicked();
  };

  return (
    <Background>
      <BackgroundImg
        src={`${publicRuntimeConfig.VROOM_URL}/static-assets/images/home-page/who-we-are-background.png`}
        alt={'Reconditioning center'}
        loading="lazy"
      />
      <StyledContainer>
        <Title variant="h2">{viewModel.title}</Title>
        <SubTitle>{viewModel.subtitle}</SubTitle>
        <StyledButton color="primary" onClick={onClick} variant="contained">
          {viewModel.button}
        </StyledButton>
      </StyledContainer>
    </Background>
  );
};

export default WhoWeAreView;
