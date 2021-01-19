import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  ListItem,
} from '@material-ui/core';
import { styled, withStyles } from '@material-ui/core/styles';
import { PopularFeatures as FiltersDataPopularFeatures } from '@vroom-web/catalog-url-integration';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import FeaturesViewModel from './ViewModel';

interface Props {
  viewModel: FeaturesViewModel;
}

const Label = withStyles(() => ({
  label: {
    fontSize: '16px',
  },
  root: {
    justifyContent: 'space-between',
    marginLeft: '0px',
    '& span.Mui-checked + span': {
      fontWeight: 600,
    },
  },
}))(FormControlLabel);

const CheckboxCustom = withStyles((theme) => ({
  root: {
    color: theme.palette.grey['A100'],
  },
  checked: {
    fontWeight: 600,
  },
}))(Checkbox);

const Reset = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1, 0),
  height: '36px',
  flexDirection: 'column',
  '&.MuiListItem-root.Mui-disabled >p': {
    color: theme.palette.grey['A100'],
  },
}));

const Value = styled(Typography)(() => ({
  fontSize: '16px',
}));

const FeaturesView: React.FC<Props> = ({ viewModel }) => {
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void => {
    const filtersDataValue = event.target.value as FiltersDataPopularFeatures;
    viewModel.handleCheckboxChange(filtersDataValue, checked);
  };
  return (
    <FormGroup>
      {viewModel.getPopularFeatures().map((feature) => {
        const checked = viewModel.isChecked(feature);
        const { display, filtersDataValue } = feature;

        return (
          <Label
            key={display}
            labelPlacement="start"
            control={
              <CheckboxCustom
                color="primary"
                checked={checked}
                onChange={handleCheckboxChange}
                value={filtersDataValue}
              />
            }
            label={display}
          />
        );
      })}
      <Reset
        button
        onClick={viewModel.reset}
        disabled={viewModel.isResetButtonDisabled()}
      >
        <Value fontWeight="fontWeightMedium" color="primary.main">
          {viewModel.resetButtonLabel}
        </Value>
      </Reset>
    </FormGroup>
  );
};

export default observer(FeaturesView);
