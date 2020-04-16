import Box from '@material-ui/core/Box';
import React from 'react';

import HeaderBar from './HeaderBar';
import HeaderNav from './HeaderNav';
import HeaderPoweredByLogo from './HeaderPoweredByLogo';

const PoweredByHeader: React.FC = () => {
  return (
    <HeaderBar>
      <Box mr="auto">
        <HeaderPoweredByLogo />
      </Box>
      <HeaderNav />
    </HeaderBar>
  );
};

export default PoweredByHeader;
