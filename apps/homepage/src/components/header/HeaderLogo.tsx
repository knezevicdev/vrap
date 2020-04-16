import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';

import { ReactComponent as RocketAutoHorizontalLogo } from '../svg/rocket-auto-horizontal-logo.svg';
import { ReactComponent as RocketAutoVerticalLogo } from '../svg/rocket-auto-vertical-logo.svg';

import InternalLink from 'src/ui/InternalLink';

const HeaderLogo: React.FC = () => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <InternalLink href="/">
      {mdUp ? (
        <RocketAutoHorizontalLogo
          style={{
            flexGrow: 0,
            flexShrink: 0,
            width: 'auto',
            height: '24px',
          }}
        />
      ) : (
        <RocketAutoVerticalLogo
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

export default HeaderLogo;
