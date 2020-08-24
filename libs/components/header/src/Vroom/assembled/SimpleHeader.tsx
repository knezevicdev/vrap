import Box from '@material-ui/core/Box';
import React from 'react';

import { InProgressDealBar } from '../../index';
import Bar from '../components/Bar';
import Logo from '../components/Logo';
import HeaderNav from './HeaderNav';

interface Props {
  gearboxPrivateUrl: string;
}

const SimpleHeader: React.FC<Props> = ({ gearboxPrivateUrl }) => {
  return (
    <>
      <Bar>
        <Box mr="auto">
          <Logo />
        </Box>
        <HeaderNav />
      </Bar>
      <InProgressDealBar gearboxPrivateUrl={gearboxPrivateUrl} />
    </>
  );
};

export default SimpleHeader;
