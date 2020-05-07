import Grid from '@material-ui/core/Grid';
import { styled, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Button, Container } from '@vroom-web/ui';
import React from 'react';

import HighlightView from './HighlightView';
import ViewModel from './ViewModel';

const Background = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('sm')]: {
    alignItems: 'center',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  minWidth: '180px',
  letterSpacing: '1.75px',
  fontWeight: 600,
  marginTop: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    marginTop: theme.spacing(4),
  },
}));

interface Props {
  viewModel: ViewModel;
}

const HighlightsView: React.FC<Props> = ({ viewModel }) => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const handleButtonClick = (): void => {
    viewModel.handleButtonClick();
  };

  return (
    <Background>
      <StyledContainer>
        <Grid container spacing={mdUp ? 6 : 2}>
          {viewModel.highlights.map((highlight, index) => (
            <Grid key={index} item xs={12} md={4}>
              <HighlightView
                description={highlight.description}
                imgAlt={highlight.imgAlt}
                imgSrc={highlight.imgSrc}
                title={highlight.title}
              />
            </Grid>
          ))}
        </Grid>
        <StyledButton
          color="primary"
          onClick={handleButtonClick}
          variant="contained"
        >
          {viewModel.ctaLabel}
        </StyledButton>
      </StyledContainer>
    </Background>
  );
};

export default HighlightsView;
