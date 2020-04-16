import Box from '@material-ui/core/Box';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import reactStringReplace from 'react-string-replace';

import ViewModel from './ViewModel';

import Container from 'src/ui/Container';
import Typography from 'src/ui/Typography';

interface Props {
  viewModel: ViewModel;
}

const FeaturesView: React.FC<Props> = props => {
  const { viewModel } = props;

  const [limited, setLimited] = useState(true);
  const handleClick = (): void => setLimited(!limited);

  const items = viewModel.display(limited);

  return (
    <Container content>
      <Box mb={{ xs: 2, md: 4 }}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography variant="h2" fontWeight="fontWeightMedium">
              {viewModel.title}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Grid container>
        {items.map(i => {
          return (
            <Grid key={i} item xs={12} sm={6} md={4}>
              <Box pr={6} pb={1}>
                <Typography variant="body1" fontWeight="fontWeightLight">
                  {reactStringReplace(
                    i,
                    /<button>(.*)<\/button>/g,
                    (match, index) => (
                      <ButtonBase key={`rsr-${index}`} onClick={handleClick}>
                        <Typography
                          variant="body1"
                          fontWeight="fontWeightMedium"
                          color="secondary.main"
                          display="inline"
                          component="span"
                        >
                          {match}
                        </Typography>
                      </ButtonBase>
                    )
                  )}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default observer(FeaturesView);
