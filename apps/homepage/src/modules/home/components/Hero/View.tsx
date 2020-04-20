import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { styled, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Button, Container } from '@vroom-web/ui';
import React from 'react';

import Autocomplete from './Autocomplete';
import InventoryCountLabel from './InventoryCountLabel';
import ViewModel from './ViewModel';

import globalEnv from 'src/globalEnv';
import Typography from 'src/ui/Typography';

const StyledBox = styled(Box)(() => ({
  background: `url(${globalEnv.CDN_URL}/modules/home/hero-background.png)`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center top',
}));

const StyledButton = styled(Button)(() => ({
  minHeight: '56px',
}));

interface Props {
  viewModel: ViewModel;
}

const HeroView: React.FC<Props> = ({ viewModel }) => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const handleMobileButtonClick = (): void => {
    viewModel.handleMobileButtonClick();
  };

  const autocompleteOrButtonView = (): JSX.Element => {
    if (mdUp) {
      return <Autocomplete />;
    }
    return (
      <StyledButton
        color="primary"
        onClick={handleMobileButtonClick}
        variant="contained"
      >
        {viewModel.mobileButtonLabel}
      </StyledButton>
    );
  };

  return (
    <StyledBox>
      <Container content>
        <Box color="primary.contrastText" py={{ xs: 6, md: 15 }}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Box mb={4}>
                <Typography
                  fontWeight="bold"
                  lineHeight="normal"
                  variant="h1"
                  whiteSpace="prewrap"
                >
                  {viewModel.title}
                </Typography>
              </Box>
              <Box display="flex" mb={2}>
                {autocompleteOrButtonView()}
              </Box>
              <InventoryCountLabel />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </StyledBox>
  );
};

export default HeroView;
