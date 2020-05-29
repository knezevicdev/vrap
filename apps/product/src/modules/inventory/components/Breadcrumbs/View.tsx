import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import React from 'react';

import ViewModel from './ViewModel';

import Container from 'src/ui/Container';
import Typography from 'src/ui/Typography';

interface Props {
  viewModel: ViewModel;
}

const Crumb = styled(Typography)(() => ({
  cursor: 'pointer',
  borderBottom: 'solid 1px transparent',
  '&:hover': {
    borderBottom: 'solid 1px',
  },
}));

const GridItem = styled(Grid)(() => ({
  display: 'flex',
}));

const Divider = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));

const BreadcrumbsView: React.FC<Props> = (props) => {
  const { viewModel } = props;
  const crumbs = viewModel.crumbs();
  const lastIndex = crumbs.length - 1;

  return (
    <Container content>
      <Grid container spacing={1}>
        {/*TODO: How do we do SEO for link at bottom?*/}
        {crumbs.map((crumb, index) => {
          return (
            <GridItem item key={crumb.key}>
              <Crumb
                onClick={crumb.onClick}
                key={crumb.key}
                fontWeight="fontWeightMedium"
                color="secondary.main"
              >
                {crumb.name}
              </Crumb>
              {index !== lastIndex && (
                <Divider fontWeight="fontWeightMedium">/</Divider>
              )}
            </GridItem>
          );
        })}
      </Grid>
    </Container>
  );
};

export default observer(BreadcrumbsView);
