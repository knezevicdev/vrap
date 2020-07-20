import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';

import NavigationViewModel from './ViewModel';

interface Props {
  viewModel: NavigationViewModel;
}

const DesktopNavigationView: React.FC<Props> = ({ viewModel }) => {
  useEffect(() => {
    viewModel.handleMount();
  }, [viewModel]);

  return (
    <Grid container spacing={2}>
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
                <Box key={index} display="flex" pb={1}>
                  <Link href={link.href} target={link.target} rel={link.rel}>
                    <Typography variant="body1" color="text.secondary">
                      {link.label}
                    </Typography>
                  </Link>
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
