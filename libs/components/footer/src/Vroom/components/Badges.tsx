import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import { ReactComponent as AppStoreBadge } from '../svg/appStoreBadge.svg';
import { ReactComponent as GooglePlayBadge } from '../svg/googlePlayBadge.svg';

const Badges: React.FC = () => {
  const androidUrl =
    'https://play.google.com/store/apps/details?id=com.vroom.app.android&referrer=utm_source%3Dwebsitefooter%26utm_campaign%3Dwebsitefooter';
  const iosUrl =
    'https://apps.apple.com/app/apple-store/id1494048038?pt=120897984&ct=websitefooter&mt=8';
  return (
    <>
      <Box mb={1}>
        <Typography
          variant="caption"
          color="text.secondary"
          fontWeight="fontWeightSemibold"
        >
          GET THE VROOM APP
        </Typography>
      </Box>
      <Grid container alignItems="center">
        <Box display="flex" mr={1}>
          <a href={androidUrl}>
            <GooglePlayBadge />
            <Typography variant="srOnly">Google Play</Typography>
          </a>
        </Box>
        <Box display="flex">
          <a href={iosUrl}>
            <AppStoreBadge />
            <Typography variant="srOnly">App Store</Typography>
          </a>
        </Box>
      </Grid>
    </>
  );
};

export default Badges;
