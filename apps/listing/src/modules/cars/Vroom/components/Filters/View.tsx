import {
  Collapse,
  Drawer,
  List,
  ListItem,
  useMediaQuery,
} from '@material-ui/core';
import { styled, useTheme } from '@material-ui/core/styles';
import { Close, ExpandLess, ExpandMore } from '@material-ui/icons';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import { ReactComponent as FiltersIcon } from '../filters.svg';
import { Filter } from './store';
import FiltersViewModel from './ViewModel';

const FiltersContainer = styled(List)(({ theme }) => ({
  minWidth: '250px',
  maxWidth: '250px',
  background: 'white',
  [theme.breakpoints.up('sm')]: {
    boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.15)',
  },
  [theme.breakpoints.only('xs')]: {
    height: '100%',
  },
}));

const StyledFilter = styled('div')(() => ({
  borderBottom: 'solid 1px #F1F1F1',
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(2, 2),
  justifyContent: 'space-between',
}));

const Title = styled(Typography)(() => ({
  textTransform: 'uppercase',
  fontSize: '16px',
}));

const FiltersButton = styled(Typography)(({ theme }) => ({
  paddingLeft: theme.spacing(1),
  fontSize: '16px',
}));

const StyledFiltersIcon = styled(FiltersIcon)(() => ({
  cursor: 'pointer',
}));

const FiltersCloseContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(1, 2),
  alignItems: 'center',
  cursor: 'pointer',
}));

const CloseIcon = styled(Close)(() => ({
  marginLeft: 'auto',
}));

interface FiltersViewProps {
  viewModel: FiltersViewModel;
}

const FiltersView: React.FC<FiltersViewProps> = ({ viewModel }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const handleFiltersCloseContainerClick = (): void => {
    viewModel.toggleAreFiltersOpen();
  };
  const handleListItemClick = (filter: Filter) => (): void => {
    viewModel.toggleVisibility(filter);
  };
  const handleDrawerClose = (): void => {
    viewModel.toggleAreFiltersOpen();
  };

  const Menu = (
    <FiltersContainer>
      <FiltersCloseContainer onClick={handleFiltersCloseContainerClick}>
        <StyledFiltersIcon />
        <FiltersButton fontWeight="fontWeightMedium">Filters</FiltersButton>
        <CloseIcon fontSize="small" />
      </FiltersCloseContainer>
      {viewModel.getFilters().map((filter) => {
        const { display, FilterComponent, open } = filter;
        return (
          <StyledFilter key={display}>
            <StyledListItem button onClick={handleListItemClick(filter)}>
              <Title fontWeight="fontWeightMedium">{display}</Title>
              {open ? <ExpandLess /> : <ExpandMore />}
            </StyledListItem>
            <Collapse in={open} timeout="auto">
              <FilterComponent />
            </Collapse>
          </StyledFilter>
        );
      })}
    </FiltersContainer>
  );

  const areFiltersOpen = viewModel.areFiltersOpen();

  if (isMobile) {
    return (
      <Drawer open={areFiltersOpen} onClose={handleDrawerClose}>
        {Menu}
      </Drawer>
    );
  } else if (areFiltersOpen) {
    return Menu;
  }

  return null;
};

export default observer(FiltersView);
