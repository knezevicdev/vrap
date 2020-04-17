import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { styled, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@vroom-web/container';
import React from 'react';

import Highlight from './HighlightView';
import ViewModel from './ViewModel';

import Button from 'src/ui/Button';

const StyledButton = styled(Button)(() => ({
  minWidth: '200px',
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
    <Box bgcolor="background.paper">
      <Container content>
        <Box py={{ xs: 6, md: 12 }}>
          <Box mb={4}>
            <Grid container spacing={mdUp ? 6 : 4}>
              {viewModel.highlights.map((highlight, index) => (
                <Grid key={index} item xs={12} md={4}>
                  <Highlight
                    description={highlight.description}
                    imgAlt={highlight.imgAlt}
                    imgSrc={highlight.imgSrc}
                    title={highlight.title}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box display="flex" justifyContent="center">
            <StyledButton
              color="primary"
              onClick={handleButtonClick}
              variant="contained"
            >
              {viewModel.ctaLabel}
            </StyledButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HighlightsView;
