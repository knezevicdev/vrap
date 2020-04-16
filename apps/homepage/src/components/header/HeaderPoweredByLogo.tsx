import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';

import { ReactComponent as RocketAutoPoweredByHorizontalLogo } from '../svg/rocket-auto-powered-by-horizontal-logo.svg';
import { ReactComponent as RocketAutoPoweredByVerticalLogo } from '../svg/rocket-auto-powered-by-vertical-logo.svg';

import InternalLink from 'src/ui/InternalLink';

const HeaderPoweredByLogo: React.FC = () => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <InternalLink href="/">
      {mdUp ? (
        <RocketAutoPoweredByHorizontalLogo
          style={{
            flexGrow: 0,
            flexShrink: 0,
            width: 'auto',
            height: '24px',
          }}
        />
      ) : (
        <RocketAutoPoweredByVerticalLogo
          style={{
            flexGrow: 0,
            flexShrink: 0,
            width: 'auto',
            height: '24px',
          }}
        />
      )}
    </InternalLink>
  );
};

export default HeaderPoweredByLogo;
