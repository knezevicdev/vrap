import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { styled } from '@material-ui/core/styles';
import Check from '@material-ui/icons/Check';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import ColorViewModel from './ViewModel';

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

const Circle = styled('div')(() => ({
  height: '24px',
  width: '24px',
  marginRight: '8px',
  borderRadius: '50%',
}));

const Value = styled(Typography)(() => ({
  fontSize: '14px',
}));

export interface Props {
  viewModel: ColorViewModel;
}

const ColorView: React.FC<Props> = ({ viewModel }) => {
  return (
    <StyledList>
      {viewModel.getColors().map((color) => {
        const { display, filtersDataValue, value } = color;
        const {
          isSelected,
          fontWeight,
          hasBorder,
          isMetallic,
        } = viewModel.getItemInformation(filtersDataValue);
        return (
          <StyledListItem
            key={display}
            button
            onClick={viewModel.handleListItemClick(
              filtersDataValue,
              isSelected
            )}
          >
            <Circle
              style={{
                backgroundColor: value,
                border: hasBorder ? 'solid 1px #041022' : 'none',
                backgroundImage: isMetallic
                  ? 'linear-gradient(224deg, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.50) 100%)'
                  : 'none',
              }}
            />
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
        <Value fontWeight={600} color="#257FA4">
          {viewModel.resetButtonLabel}
        </Value>
      </Reset>
    </StyledList>
  );
};

export default observer(ColorView);