import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { styled } from '@material-ui/core/styles';
import Check from '@material-ui/icons/Check';
import React from 'react';
import styledComponents from 'styled-components';

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

/*
  TODO
  Can we pass in props with MU styled?
*/
const Circle = styledComponents.div<{
  background: string;
  hasBorder: boolean;
  isMetallic: boolean;
}>`
  height: 24px;
  width: 24px;
  margin-right: 8px;
  border-radius: 50%;
  background-color: ${props => props.background};
  ${props => props.hasBorder && 'border: solid 1px #041022;'}
    ${props =>
      props.isMetallic &&
      `background-image: linear-gradient(224deg, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.50) 100%);`}
`;

export interface Props {
  viewModel: ColorViewModel;
}

const ColorView: React.FC<Props> = ({ viewModel }) => {
  return (
    <StyledList>
      {viewModel.colors.map(color => {
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
              background={background}
              hasBorder={hasBorder}
              isMetallic={isMetallic}
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

export default ColorView;
