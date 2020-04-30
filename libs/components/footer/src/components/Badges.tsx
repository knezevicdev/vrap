import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import React from 'react';

import { ReactComponent as AppStoreSvg } from '../assets/appStore.svg';
import googlePlayBadge from '../assets/googlePlayBadge.png';

const Badges: React.FC = () => {
  const androidUrl =
    'https://play.google.com/store/apps/details?id=com.vroom.app.android&referrer=utm_source%3Dwebsitefooter%26utm_campaign%3Dwebsitefooter';
  const iosUrl =
    'https://apps.apple.com/app/apple-store/id1494048038?pt=120897984&ct=websitefooter&mt=8';
  return (
    <>
      <Box mb={1}>GET THE VROOM APP</Box>
      <Grid container alignItems="center">
        <Box display="flex" mr={1}>
          <a href={androidUrl}>
            <img
              alt="Get it on Google Play"
              // src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
              src={googlePlayBadge}
              style={{
                width: 'auto',
                height: '32px',
              }}
            />
          </a>
        </Box>
        <Box display="flex">
          <a href={iosUrl}>
            <AppStoreSvg style={{ height: '32px' }} />
          </a>
        </Box>
      </Grid>
    </>
  );
};

export default Badges;
