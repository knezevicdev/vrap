import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import React from 'react';

import FooterBar from '../components/Bar';
import Copyright from '../components/Copyright';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';

const StandardFooter: React.FC = () => {
  return (
    <FooterBar>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <Box mb={{ xs: 1, md: 2 }}>
            <Logo />
          </Box>
          <Box mb={{ xs: 1, md: 2 }}>
            <Copyright />
          </Box>
          <Box>
            <Link href="https://www.facebook.com/vroom" target="_blank">
              <FacebookIcon />
            </Link>
            <Link href="https://www.twitter.com/vroomcars" target="_blank">
              <TwitterIcon />
            </Link>
            <Link href="https://www.instagram.com/vroom" target="_blank">
              <InstagramIcon />
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Navigation />
        </Grid>
      </Grid>
    </FooterBar>
  );
};

export default StandardFooter;
