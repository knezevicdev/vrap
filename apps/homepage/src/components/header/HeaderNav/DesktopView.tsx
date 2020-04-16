import React from 'react';

import HeaderNavViewModel from './ViewModel';

import InternalLink from 'src/ui/InternalLink';
import Typography from 'src/ui/Typography';

interface DesktopViewProps {
  viewModel: HeaderNavViewModel;
}

const HeaderNavDesktopView: React.FC<DesktopViewProps> = ({ viewModel }) => {
  const contactUsLink = viewModel.contactUsLink();
  return (
    <InternalLink href={contactUsLink.href}>
      <Typography
        color="secondary.main"
        fontWeight="fontWeightMedium"
        variant="body1"
      >
        {contactUsLink.label}
      </Typography>
    </InternalLink>
  );
};

export default HeaderNavDesktopView;
