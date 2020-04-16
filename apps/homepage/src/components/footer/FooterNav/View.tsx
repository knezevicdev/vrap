import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/core/styles';
import React from 'react';

import FooterNavViewModel from './ViewModel';

import ExternalLink from 'src/ui/ExternalLink';
import InternalLink from 'src/ui/InternalLink';

const StyledInternalLink = styled(InternalLink)(({ theme }) => ({
  display: 'block',
  fontWeight: theme.typography.fontWeightMedium,
  '&:not(:last-child)': {
    marginBottom: theme.spacing(1),
  },
}));

const StyledExternalLink = styled(ExternalLink)(({ theme }) => ({
  display: 'block',
  fontWeight: theme.typography.fontWeightMedium,
  '&:not(:last-child)': {
    marginBottom: theme.spacing(1),
  },
}));

interface FooterNavViewProps {
  viewModel: FooterNavViewModel;
}

const FooterNavView: React.FC<FooterNavViewProps> = ({ viewModel }) => {
  return (
    <Box>
      {viewModel.links().map((link, index) => {
        if (link.external) {
          return (
            <StyledExternalLink
              key={index}
              color="secondary"
              href={link.href}
              target={link.target}
              variant="body1"
            >
              {link.label}
            </StyledExternalLink>
          );
        }
        return (
          <StyledInternalLink
            key={index}
            color="secondary"
            href={link.href}
            variant="body1"
          >
            {link.label}
          </StyledInternalLink>
        );
      })}
    </Box>
  );
};

export default FooterNavView;
