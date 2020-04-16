import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import React from 'react';

import FooterBar from './FooterBar';
import FooterCopyright from './FooterCopyright';
import FooterNav from './FooterNav';
import FooterPoweredByLogo from './FooterPoweredByLogo';

const PoweredByFooter: React.FC = () => {
  return (
    <FooterBar>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={7} md={6}>
          <Box mb={{ xs: 1, md: 2 }}>
            <FooterPoweredByLogo />
          </Box>
          <FooterCopyright />
        </Grid>
        <Grid item xs={12} sm={5} md={6}>
          <FooterNav />
        </Grid>
      </Grid>
    </FooterBar>
  );
};

export default PoweredByFooter;
