import Box from '@material-ui/core/Box';
import React from 'react';

import Bar from '../components/Bar';
import Logo from '../components/Logo';
import Search from '../components/Search';
import HeaderNav from './HeaderNav';

interface Props {
  invSearchV3Url: string;
}

const SearchHeader: React.FC<Props> = ({ invSearchV3Url }) => {
  return (
    <Bar>
      <Box mr={{ xs: 'auto', md: 4 }}>
        <Logo />
      </Box>
      <Search invSearchV3Url={invSearchV3Url} />
      <Box ml={{ md: 4 }}>
        <HeaderNav />
      </Box>
    </Bar>
  );
};

export default SearchHeader;
