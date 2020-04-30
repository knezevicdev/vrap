import Box from '@material-ui/core/Box';
import React from 'react';

import Badges from '../components/Badges';
import Copyright from '../components/Copyright';
import Logo from '../components/Logo';
import Social from '../components/Social';

const Brand: React.FC = () => {
  return (
    <>
      <Box mb={{ xs: 3, md: 2 }}>
        <Logo />
      </Box>
      <Box mb={4}>
        <Badges />
      </Box>
      <Box mb={1}>
        <Social />
      </Box>
      <Box>
        <Copyright />
      </Box>
    </>
  );
};

export default Brand;
