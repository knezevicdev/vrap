import Box from '@material-ui/core/Box';
import React from 'react';

import HeaderBar from './HeaderBar';
import HeaderLogo from './HeaderLogo';
import HeaderNav from './HeaderNav';
import HeaderSearch from './HeaderSearch';

const SearchHeader: React.FC = () => {
  return (
    <HeaderBar>
      <Box mr={{ xs: 'auto', md: 4 }}>
        <HeaderLogo />
      </Box>
      <HeaderSearch />
      <Box ml={{ md: 4 }}>
        <HeaderNav />
      </Box>
    </HeaderBar>
  );
};

export default SearchHeader;
