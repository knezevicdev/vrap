import { FormControlLabel, ListItem, RadioGroup } from '@material-ui/core';
import { styled, withStyles } from '@material-ui/core/styles';
import { Transmission as FiltersDataTransmission } from '@vroom-web/catalog-url-integration';
import { observer } from 'mobx-react';
import React from 'react';

import TransmissionsViewModel from './ViewModel';

import Radio from 'src/ui/Radio';

interface Props {
  viewModel: TransmissionsViewModel;
}

const Label = withStyles(() => ({
  label: {
    fontSize: '16px',
  },
  root: {
    width: '100%',
    justifyContent: 'space-between',
    marginLeft: '0px',
    '& span.Mui-checked + span': {
      fontWeight: 600,
    },
  },
}))(FormControlLabel);

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  height: theme.spacing(4),
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
}));

const RadioGroupCustom = withStyles(() => ({
  root: {
    paddingBottom: '16px',
  },
}))(RadioGroup);

const Transmissions: React.FC<Props> = ({ viewModel }) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const filtersDataValue = event.target.value as FiltersDataTransmission;
    viewModel.handleRadioGroupChange(filtersDataValue);
  };

  return (
    <RadioGroupCustom
      value={viewModel.getActiveTransmission()}
      onChange={onChange}
    >
      <StyledListItem key={viewModel.allOption.display} button>
        <Label
          labelPlacement="start"
          control={<Radio color="primary" />}
          label={viewModel.allOption.display}
          value={viewModel.allOption.value}
        />
      </StyledListItem>
      {viewModel.getTransmissions().map((transmission) => {
        const { display, filtersDataValue } = transmission;
        return (
          <StyledListItem key={display} button>
            <Label
              labelPlacement="start"
              value={filtersDataValue}
              control={<Radio color="primary" />}
              label={display}
            />
          </StyledListItem>
        );
      })}
    </RadioGroupCustom>
  );
};

export default observer(Transmissions);
