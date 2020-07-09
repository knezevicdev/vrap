import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { styled } from '@material-ui/core/styles';
import Check from '@material-ui/icons/Check';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import BodyTypesViewModel from './ViewModel';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1, 0),
  height: theme.spacing(4),
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
          <StyledListItem
            key={display}
            button
            onClick={viewModel.handleListItemClick(
              filtersDataValue,
              isSelected
            )}
          >
            <Value fontWeight={fontWeight}>{display}</Value>
            {isSelected && <StyledCheck fontSize="small" color="secondary" />}
          </StyledListItem>
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
