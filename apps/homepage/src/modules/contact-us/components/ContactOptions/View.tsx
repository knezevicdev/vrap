import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React from 'react';

import ContactOptionView from './ContactOptionView';
import ViewModel from './ViewModel';

import Container from 'src/ui/Container';
import Typography from 'src/ui/Typography';

interface Props {
  viewModel: ViewModel;
}

const ContactOptionsView: React.FC<Props> = ({ viewModel }) => {
  const options = viewModel.options.map((option, idx) => {
    return (
      <Grid item xs={12} key={idx}>
        <ContactOptionView option={option} />
      </Grid>
    );
  });
  return (
    <Container content>
      <Box px={{ xs: 0, lg: 5 }} mt={4} mb={12}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h2" fontWeight="fontWeightMedium">
              {viewModel.title}
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <Paper square elevation={0} variant="outlined">
              <Box p={{ xs: 2, sm: 5 }}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Typography variant="h2" fontWeight="fontWeightLight">
                      {viewModel.subtitle}
                    </Typography>
                  </Grid>
                  {options}
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ContactOptionsView;
