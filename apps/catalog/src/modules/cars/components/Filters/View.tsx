import Collapse from '@material-ui/core/Collapse';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { styled } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Close from '@material-ui/icons/Close';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
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
  padding: theme.spacing(2),
  borderRight: 'solid 1px #bebebe',
  borderBottom: 'solid 1px #bebebe',
  [theme.breakpoints.only('xs')]: {
    height: '100%',
  },
}));

const StyledFilter = styled('div')(() => ({
  borderBottom: 'solid 1px #bebebe',
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(2, 0),
  justifyContent: 'space-between',
}));

const Title = styled(Typography)(() => ({
  textTransform: 'uppercase',
}));

const FiltersButton = styled(Typography)(({ theme }) => ({
  paddingLeft: theme.spacing(1),
}));

const StyledFiltersIcon = styled(FiltersIcon)(() => ({
  cursor: 'pointer',
}));

const FiltersCloseContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(1, 0),
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
        <FiltersButton fontWeight="fontWeightLight">Filters</FiltersButton>
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
