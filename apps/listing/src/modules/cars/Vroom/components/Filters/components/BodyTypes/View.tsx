import { Checkbox, List, ListItem } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Check from '@material-ui/icons/Check';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React, { Fragment } from 'react';

import Truck from './Truck';
import BodyTypesViewModel from './ViewModel';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1, 0),
  height: theme.spacing(4),
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
}));

const Reset = styled(StyledListItem)(({ theme }) => ({
  flexDirection: 'column',
  '&.MuiListItem-root.Mui-disabled >p': {
    color: theme.palette.grey['A100'],
  },
}));

const StyledList = styled(List)(({ theme }) => ({
  padding: theme.spacing(0, 0, 2, 0),
}));

const StyledCheck = styled(Check)(() => ({
  marginLeft: 'auto',
}));

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  color: theme.palette.grey['A100'],
  paddingRight: 0,
  '&.MuiIconButton-root.Mui-disabled': {
    color: theme.palette.grey['A100'],
  },
}));

const Value = styled(Typography)(() => ({
  fontSize: '16px',
}));

interface Props {
  viewModel: BodyTypesViewModel;
}

const BodyTypesView: React.FC<Props> = ({ viewModel }) => {
  const resetButtonLabel = viewModel.resetButtonLabel;
  return (
    <StyledList>
      {viewModel.getBodyTypes().map((bodyType) => {
        const { display, filtersDataValue } = bodyType;
        const { isSelected, fontWeight } = viewModel.getItemInformation(
          filtersDataValue
        );
        return (
          <Fragment key={filtersDataValue}>
            <StyledListItem
              key={display}
              button
              onClick={viewModel.handleListItemClick(
                filtersDataValue,
                isSelected
              )}
            >
              <Value fontWeight={fontWeight}>{display}</Value>
              {isSelected ? (
                <StyledCheck fontSize="small" color="secondary" />
              ) : (
                <CustomCheckbox disabled={true} aria-hidden="true" />
              )}
            </StyledListItem>
            {filtersDataValue === 'truck' && isSelected ? <Truck /> : null}
          </Fragment>
        );
      })}
      <Reset
        button
        onClick={viewModel.reset}
        disabled={viewModel.isResetDisabled()}
      >
        <Value fontWeight="fontWeightMedium" color="primary.main">
          {resetButtonLabel}
        </Value>
      </Reset>
    </StyledList>
  );
};

export default observer(BodyTypesView);
