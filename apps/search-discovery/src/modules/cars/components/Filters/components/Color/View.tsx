import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { styled } from '@material-ui/core/styles';
import Check from '@material-ui/icons/Check';
import { observer } from 'mobx-react';
import React from 'react';

import ColorViewModel from './ViewModel';

import Typography from 'src/ui/Typography';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1, 0),
  height: theme.spacing(4),
}));

const Reset = styled(StyledListItem)(() => ({
  flexDirection: 'column',
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

export interface Props {
  viewModel: ColorViewModel;
}

const ColorView: React.FC<Props> = ({ viewModel }) => {
  return (
    <StyledList>
      {viewModel.colors.map((color) => {
        const { displayName, url, background } = color;
        const {
          isSelected,
          fontWeight,
          hasBorder,
          isMetallic,
        } = viewModel.getItemInformation(url);
        return (
          <StyledListItem
            key={displayName}
            button
            onClick={viewModel.handleClick(url, isSelected)}
          >
            <Circle
              style={{
                backgroundColor: background,
                border: hasBorder ? 'solid 1px #041022' : 'none',
                backgroundImage: isMetallic
                  ? 'linear-gradient(224deg, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.50) 100%)'
                  : 'none',
              }}
            />
            <Typography fontWeight={fontWeight}>{displayName}</Typography>
            {isSelected && <StyledCheck fontSize="small" color="secondary" />}
          </StyledListItem>
        );
      })}
      <Reset
        button
        onClick={viewModel.reset}
        disabled={viewModel.isResetDisabled()}
      >
        <Typography
          variant="body1"
          fontWeight="fontWeightMedium"
          color="secondary.main"
        >
          {viewModel.resetButtonLabel}
        </Typography>
      </Reset>
    </StyledList>
  );
};

export default observer(ColorView);
