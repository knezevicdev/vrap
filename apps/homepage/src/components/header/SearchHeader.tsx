import Box from '@material-ui/core/Box';
import React from 'react';

import HeaderBar from './HeaderBar';
import HeaderNav from './HeaderNav';
import HeaderPoweredByLogo from './HeaderPoweredByLogo';
import HeaderSearch from './HeaderSearch';

const SearchHeader: React.FC = () => {
  return (
    <HeaderBar>
      <Box mr={{ xs: 'auto', md: 4 }}>
        <HeaderPoweredByLogo />
      </Box>
      <HeaderSearch />
      <Box ml={{ md: 4 }}>
        <HeaderNav />
      </Box>
    </HeaderBar>
  );
};

export default SearchHeader;
