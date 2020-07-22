import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import { ReactComponent as FiltersIcon } from '../../../filters.svg';
import Autocomplete from './components/Autocomplete';
import Chips from './components/Chips';
import Sort from './components/Sort';
import TopSectionViewModel from './ViewModel';

const TopSectionGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginBottom: theme.spacing(4),
  },
}));

const FiltersButton = styled(Typography)(({ theme }) => ({
  paddingLeft: theme.spacing(1),
  cursor: 'pointer',
  fontSize: '16px',
}));

const StyledFiltersIcon = styled(FiltersIcon)(() => ({
  cursor: 'pointer',
}));

const MobileContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  margin: theme.spacing(2),
  flexDirection: 'column',
}));

const FiltersAndSort = styled('div')(({ theme }) => ({
  display: 'flex',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  alignItems: 'center',
}));

const FiltersDesktop = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(2),
}));

const DesktopContainer = styled('div')(() => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
}));

const FiltersAndAutocomplete = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const ChipsAndSort = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(1),
}));

interface Props {
  viewModel: TopSectionViewModel;
}

const TopSectionView: React.FC<Props> = ({ viewModel }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const buttonLabel = viewModel.buttonLabel;

  const handleClickFiltersIcon = (): void => {
    viewModel.toggleAreFiltersClosed();
  };
  const handleFiltersButtonClick = (): void => {
    viewModel.toggleAreFiltersClosed();
  };

  return (
    <TopSectionGrid>
      {isDesktop ? (
        <DesktopContainer>
          <FiltersAndAutocomplete>
            {viewModel.areFiltersClosed() && (
              <FiltersDesktop>
                <StyledFiltersIcon onClick={handleClickFiltersIcon} />
                <FiltersButton
                  fontWeight="fontWeightMedium"
                  onClick={handleFiltersButtonClick}
                >
                  {buttonLabel}
                </FiltersButton>
              </FiltersDesktop>
            )}
            <Autocomplete />
          </FiltersAndAutocomplete>
          <ChipsAndSort>
            <Chips />
            <Sort />
          </ChipsAndSort>
        </DesktopContainer>
      ) : (
        <MobileContainer>
          <Autocomplete />
          <FiltersAndSort>
            <StyledFiltersIcon onClick={handleClickFiltersIcon} />
            <FiltersButton
              fontWeight="fontWeightLight"
              onClick={handleFiltersButtonClick}
            >
              {buttonLabel}
            </FiltersButton>
            <Sort />
          </FiltersAndSort>
          <Chips />
        </MobileContainer>
      )}
    </TopSectionGrid>
  );
};

export default observer(TopSectionView);
