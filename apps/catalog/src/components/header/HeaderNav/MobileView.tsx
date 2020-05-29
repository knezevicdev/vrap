import IconButton from '@material-ui/core/IconButton';
import { useTheme } from '@material-ui/core/styles';
import React from 'react';

import HeaderNavViewModel from './ViewModel';

import InternalLink from 'src/ui/InternalLink';

interface HeaderNavMobileViewProps {
  viewModel: HeaderNavViewModel;
}

const HeaderNavMobileView: React.FC<HeaderNavMobileViewProps> = ({
  viewModel,
}) => {
  const contactUsLink = viewModel.contactUsLink();
  const { href, MobileIcon } = contactUsLink;
  const theme = useTheme();
  return (
    <InternalLink href={href}>
      <IconButton>
        <MobileIcon
          style={{ width: '20px', color: theme.palette.secondary.main }}
        />
      </IconButton>
    </InternalLink>
  );
};

export default HeaderNavMobileView;
