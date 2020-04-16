import Box from '@material-ui/core/Box';
import React from 'react';

import HeaderBar from './HeaderBar';
import HeaderLogo from './HeaderLogo';
import HeaderNav from './HeaderNav';

const SimpleHeader: React.FC = () => {
  return (
    <HeaderBar>
      <Box mr="auto">
        <HeaderLogo />
      </Box>
      <HeaderNav />
    </HeaderBar>
  );
};

export default SimpleHeader;
