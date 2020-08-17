import { styled } from '@material-ui/core/styles';
import { Button, Container, Typography } from '@vroom-web/ui';
import getConfig from 'next/config';
import React from 'react';

import ViewModel from './ViewModel';

const { publicRuntimeConfig } = getConfig();

const Background = styled('div')({
  backgroundImage: `url(${publicRuntimeConfig.BASE_PATH}/modules/home/images/who-we-are-background.png)`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center top',
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
