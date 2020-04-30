import Box from '@material-ui/core/Box';
import React from 'react';

import Bar from '../components/Bar';
import Logo from '../components/Logo';
import HeaderNav from './HeaderNav';

const SimpleHeader: React.FC = () => {
  return (
    <Bar>
      <Box mr="auto">
        <Logo />
      </Box>
      <HeaderNav />
    </Bar>
  );
};

export default SimpleHeader;
