import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';

import NavigationViewModel from './ViewModel';

const StyledLink = styled(Link)(({ theme }) => ({
  display: 'block',
  '&:not(:last-child)': {
    marginBottom: theme.spacing(1),
  },
}));

interface Props {
  viewModel: NavigationViewModel;
}

const DesktopNavigationView: React.FC<Props> = ({ viewModel }) => {
  useEffect(() => {
    viewModel.handleMount();
  }, [viewModel]);

  return (
    <Grid container>
      {viewModel.links().map((section, index) => {
        return (
          <Grid key={index} item xs={3}>
            <Box display="flex" mb={2}>
              <Typography
                variant="body1"
                fontWeight="fontWeightSemibold"
                color="grey.500"
              >
                {section.title}
              </Typography>
            </Box>
            {section.links.map((link, index) => {
              return (
                <Box key={index} display="flex" mb={1}>
                  <StyledLink href={link.href} target={link.target}>
                    <Typography variant="button" color="text.secondary">
                      {link.label}
                    </Typography>
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

export default observer(DesktopNavigationView);
