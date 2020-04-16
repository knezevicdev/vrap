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
import { observer } from 'mobx-react';
import React from 'react';

import { Filter } from '../../store/util';
import { ReactComponent as FiltersIcon } from '../filters.svg';
import BodyTypes from './components/BodyTypes';
import Color from './components/Color';
import EngineAndDrivetrain from './components/EngineAndDrivetrain';
import Makes from './components/Makes';
import Miles from './components/Miles';
import Price from './components/Price';
import Year from './components/Year';
import { FiltersViewProps } from './types';

import Typography from 'src/ui/Typography';

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

const FilterComponent = {
  [Filter.MAKE_AND_MODEL]: Makes,
  [Filter.BODY_TYPE]: BodyTypes,
  [Filter.COLOR]: Color,
  [Filter.YEAR]: Year,
  [Filter.PRICE]: Price,
  [Filter.MILES]: Miles,
  [Filter.ENGINE_AND_DRIVETRAIN]: EngineAndDrivetrain,
};

const FiltersView: React.FC<FiltersViewProps> = ({
  areFiltersOpen,
  toggleFiltersState,
  viewModel,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const onClick = (filter: string) => (): void => {
    viewModel.setFilterState(filter);
  };

  const Menu = (
    <FiltersContainer>
      <FiltersCloseContainer onClick={toggleFiltersState}>
        <StyledFiltersIcon />
        <FiltersButton fontWeight="fontWeightLight">Filters</FiltersButton>
        <CloseIcon fontSize="small" />
      </FiltersCloseContainer>
      {viewModel.getFilterKeys().map((key: string) => {
        const { display, open } = viewModel.getFilterInfo(key);
        const Filter = FilterComponent[key as Filter];
        return (
          <StyledFilter key={display}>
            <StyledListItem button onClick={onClick(key)}>
              <Title fontWeight="fontWeightMedium" variant="h3">
                {display}
              </Title>
              {open ? <ExpandLess /> : <ExpandMore />}
            </StyledListItem>
            <Collapse in={open} timeout="auto">
              <Filter />
            </Collapse>
          </StyledFilter>
        );
      })}
    </FiltersContainer>
  );

  return isMobile ? (
    <Drawer open={areFiltersOpen} onClose={toggleFiltersState}>
      {Menu}
    </Drawer>
  ) : areFiltersOpen ? (
    Menu
  ) : null;
};

export default observer(FiltersView);
