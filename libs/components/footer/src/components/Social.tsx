import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
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
          <span className="MuiTypography-srOnly">Facebook</span>
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
          <span className="MuiTypography-srOnly">Twitter</span>
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
          <span className="MuiTypography-srOnly">Instagram</span>
        </Link>
      </Box>
    </Grid>
  );
};

export default Social;
