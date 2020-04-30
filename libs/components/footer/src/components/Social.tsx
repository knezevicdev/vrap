import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import React from 'react';

const Social: React.FC = () => {
  return (
    <Grid container>
      <Box display="flex" mr={2}>
        <Link href="https://www.facebook.com/vroom" target="_blank">
          <FacebookIcon />
        </Link>
      </Box>
      <Box display="flex" mr={2}>
        <Link href="https://www.twitter.com/vroomcars" target="_blank">
          <TwitterIcon />
        </Link>
      </Box>
      <Box display="flex">
        <Link href="https://www.instagram.com/vroom" target="_blank">
          <InstagramIcon />
        </Link>
      </Box>
    </Grid>
  );
};

export default Social;
