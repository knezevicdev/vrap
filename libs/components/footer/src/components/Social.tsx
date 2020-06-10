import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import { Typography } from '@vroom-web/ui';
import React from 'react';

const Social: React.FC = () => {
  return (
    <Grid container>
      <Box display="flex" mr={2}>
        <Link
          href="https://www.facebook.com/vroom"
          target="_blank"
          rel="noopener"
          color="textSecondary"
        >
          <FacebookIcon />
          <Typography variant="srOnly">Facebook</Typography>
        </Link>
      </Box>
      <Box display="flex" mr={2}>
        <Link
          href="https://www.twitter.com/vroomcars"
          target="_blank"
          rel="noopener"
          color="textSecondary"
        >
          <TwitterIcon />
          <Typography variant="srOnly">Twitter</Typography>
        </Link>
      </Box>
      <Box display="flex">
        <Link
          href="https://www.instagram.com/vroom"
          target="_blank"
          rel="noopener"
          color="textSecondary"
        >
          <InstagramIcon />
          <Typography variant="srOnly">Instagram</Typography>
        </Link>
      </Box>
    </Grid>
  );
};

export default Social;
