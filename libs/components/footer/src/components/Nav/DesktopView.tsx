import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { styled } from '@material-ui/core/styles';
import React from 'react';

import NavigationViewModel from './ViewModel';

const StyledLink = styled(Link)(({ theme }) => ({
  display: 'block',
  fontWeight: theme.typography.fontWeightMedium,
  '&:not(:last-child)': {
    marginBottom: theme.spacing(1),
  },
}));

interface Props {
  viewModel: NavigationViewModel;
}

const DesktopNavigationView: React.FC<Props> = ({ viewModel }) => {
  return (
    <Grid container>
      {viewModel.links().map((section, index) => {
        return (
          <Grid key={index} item xs={3}>
            <Box display="flex" mb={1}>
              {section.title}
            </Box>
            {section.links.map((link, index) => {
              return (
                <Box key={index} display="flex" mb={1}>
                  <StyledLink
                    color="secondary"
                    href={link.href}
                    target={link.target}
                  >
                    {link.label}
                  </StyledLink>
                </Box>
              );
            })}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default DesktopNavigationView;
