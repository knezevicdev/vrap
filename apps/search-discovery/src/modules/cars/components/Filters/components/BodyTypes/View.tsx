import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { styled } from '@material-ui/core/styles';
import Check from '@material-ui/icons/Check';
import { observer } from 'mobx-react';
import React from 'react';

import BodyTypesViewModel from './ViewModel';

import { bodyTypes } from 'src/modules/cars/utils/types';
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

interface Props {
  viewModel: BodyTypesViewModel;
}

const BodyTypesView: React.FC<Props> = ({ viewModel }) => {
  const resetButtonLabel = viewModel.resetButtonLabel;
  return (
    <StyledList>
      {bodyTypes.map((bodyType) => {
        const { display, url } = bodyType;
        const { isSelected, fontWeight } = viewModel.getItemInformation(url);

        return (
          <StyledListItem
            key={url}
            button
            onClick={viewModel.handleClick(bodyType, isSelected)}
          >
            <Typography fontWeight={fontWeight}>{display}</Typography>
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
          {resetButtonLabel}
        </Typography>
      </Reset>
    </StyledList>
  );
};

export default observer(BodyTypesView);
