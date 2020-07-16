import Grid from '@material-ui/core/Grid';
import { styled, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Container, Typography } from '@vroom-web/ui';
import React from 'react';

import ValueView from './ValueView';
import ViewModel from './ViewModel';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.only('xs')]: {
    alignItems: 'center',
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  [theme.breakpoints.only('xs')]: {
    textAlign: 'center',
  },
  [theme.breakpoints.up('lg')]: {
    marginBottom: theme.spacing(2),
  },
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  letterSpacing: '0.25px',
  lineHeight: '1.3',
  [theme.breakpoints.only('xs')]: {
    textAlign: 'center',
  },
}));

interface Props {
  viewModel: ViewModel;
}

const ValuesView: React.FC<Props> = ({ viewModel }) => {
  const theme = useTheme();
  const betweenSmMd = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));
  let gridSpacing: 2 | 3 | 4 = 2;
  if (betweenSmMd) {
    gridSpacing = 3;
  } else if (lgUp) {
    gridSpacing = 4;
  }

  return (
    <StyledContainer>
      <Title variant="h2">{viewModel.title}</Title>
      <SubTitle>{viewModel.subtitle}</SubTitle>
      <Grid container spacing={gridSpacing}>
        {viewModel.values.map((value) => (
          <Grid key={value.type} item xs={12} md={6} container>
            <ValueView {...value} />
          </Grid>
        ))}
      </Grid>
    </StyledContainer>
  );
};

export default ValuesView;
