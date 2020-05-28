import Box from '@material-ui/core/Box';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import reactStringReplace from 'react-string-replace';

import ViewModel from './ViewModel';

import Container from 'src/ui/Container';
import Typography from 'src/ui/Typography';

interface Props {
  viewModel: ViewModel;
}

const PoweredBy = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const Logo = styled('img')(({ theme }) => ({
  height: theme.spacing(2),
}));

const Message = styled(Typography)(({ theme }) => ({
  borderLeft: `solid 1px ${theme.palette.grey['400']}`,
  marginLeft: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  lineHeight: 'inherit',
}));

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
              <Box pb={2}>
                <Typography variant="body1" fontWeight="fontWeightLight">
                  {reactStringReplace(
                    i,
                    /<button>(.*)<\/button>/g,
                    (match, index) => (
                      <ButtonBase key={`rsr-${index}`} onClick={handleClick}>
                        <Typography
                          variant="body1"
                          fontWeight="fontWeightMedium"
                          color="primary.main"
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

      <PoweredBy>
        <Logo src={viewModel.logo.src} alt={viewModel.logo.alt} />
        <Message variant="body1" fontWeight="fontWeightLight">
          {viewModel.poweredBy}
        </Message>
      </PoweredBy>
    </Container>
  );
};

export default observer(FeaturesView);
