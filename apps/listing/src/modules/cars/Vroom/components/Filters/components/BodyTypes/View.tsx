import { List, ListItem } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import getConfig from 'next/config';
import React, { Fragment } from 'react';

import Truck from './Truck';
import BodyTypesViewModel from './ViewModel';

import Checkbox from 'src/ui/Checkbox';

const { publicRuntimeConfig } = getConfig();

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1, 2),
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

const Value = styled(Typography)(() => ({
  fontSize: '16px',
  margin: 'auto',
}));

const StyledLableContainer = styled('div')(() => ({
  display: 'inline-flex',
}));

const StyledCarImage = styled('img')(() => ({
  marginRight: '8px',
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
              <StyledLableContainer>
                <StyledCarImage
                  width="56px"
                  height="24px"
                  src={`${publicRuntimeConfig.BASE_PATH}/images/${
                    isSelected
                      ? `${bodyType.display.toLocaleLowerCase()}-selected`
                      : bodyType.display.toLocaleLowerCase()
                  }.png`}
                />
                <Value fontWeight={fontWeight}>{display}</Value>
              </StyledLableContainer>
              <Checkbox aria-hidden="true" checked={isSelected} />
            </StyledListItem>
            {filtersDataValue === 'truck' && isSelected && <Truck />}
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
