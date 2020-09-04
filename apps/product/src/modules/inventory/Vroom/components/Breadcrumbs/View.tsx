import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import React from 'react';

import { ReactComponent as Arrow } from './arrow.svg';
import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const BreadcrumbsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  margin: theme.spacing(4, 'auto'),
  maxWidth: '1280px',
  width: '100%',
  padding: theme.spacing(0, 3),
}));

const CatalogBreadcrumbs = styled(Breadcrumbs)(() => ({
  fontSize: '13px',
  fontWeight: 600,
  letterSpacing: '0.25px',
  lineHeight: '13px',
}));

const BreadcrumbsView: React.FC<Props> = (props) => {
  const { viewModel } = props;

  return (
    <BreadcrumbsContainer>
      <CatalogBreadcrumbs separator={<Arrow />} aria-label="breadcrumb">
        {viewModel.crumbs().map((crumb) => {
          return (
            <div key={crumb.key}>
              {crumb.path !== '' ? (
                <Link href={crumb.path}>{crumb.name}</Link>
              ) : (
                <Typography color="primary" variant="inherit">
                  {crumb.name}
                </Typography>
              )}
            </div>
          );
        })}
      </CatalogBreadcrumbs>
    </BreadcrumbsContainer>
  );
};

export default observer(BreadcrumbsView);
