import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';

import { ReactComponent as FiltersIcon } from '../filters.svg';
import Chips from './components/Chips';
import Sort from './components/Sort';
import { TopSectionViewProps } from './types';

import Typography from 'src/ui/Typography';

const TopSectionGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginBottom: '32px',
  },
}));

const FiltersButton = styled(Typography)(() => ({
  paddingLeft: '8px',
  cursor: 'pointer',
}));

const StyledFiltersIcon = styled(FiltersIcon)(() => ({
  cursor: 'pointer',
}));

const MobileContainer = styled('div')(() => ({
  display: 'flex',
  width: '100%',
  margin: '16px',
  flexDirection: 'column',
}));

const FiltersAndSort = styled('div')(() => ({
  display: 'flex',
  marginBottom: '16px',
  alignItems: 'center',
}));

const FiltersDesktop = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(1),
}));

const TopSection: React.FC<TopSectionViewProps> = ({
  toggleFiltersState,
  areFiltersClosed,
  viewModel,
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const buttonLabel = viewModel.buttonLabel;

  return (
    <TopSectionGrid>
      {isDesktop ? (
        <>
          {areFiltersClosed && (
            <FiltersDesktop>
              <StyledFiltersIcon onClick={toggleFiltersState} />
              <FiltersButton
                fontWeight="fontWeightLight"
                onClick={toggleFiltersState}
              >
                {buttonLabel}
              </FiltersButton>
            </FiltersDesktop>
          )}
          <Chips />
          <Sort />
        </>
      ) : (
        <MobileContainer>
          <FiltersAndSort>
            <StyledFiltersIcon onClick={toggleFiltersState} />
            <FiltersButton
              fontWeight="fontWeightLight"
              onClick={toggleFiltersState}
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

export default TopSection;
