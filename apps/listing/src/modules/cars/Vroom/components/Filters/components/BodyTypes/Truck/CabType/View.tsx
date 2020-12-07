import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { CabType as FiltersDataCabType } from '@vroom-web/catalog-url-integration';
import { observer } from 'mobx-react';
import React from 'react';

import CabTypeViewModel from './ViewModel';

interface Props {
  viewModel: CabTypeViewModel;
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
}))(Checkbox);

const FormGroupCustom = withStyles(() => ({
  root: {
    paddingBottom: '16px',
  },
}))(FormGroup);

const CabTypeView: React.FC<Props> = ({ viewModel }) => {
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void => {
    const filtersDataValue = event.target.value as FiltersDataCabType;
    viewModel.handleCheckboxChange(filtersDataValue, checked);
  };

  return (
    <FormGroupCustom>
      {viewModel.getCabTypes().map((cabType) => {
        const checked = viewModel.isChecked(cabType);
        const { display, filtersDataValue } = cabType;

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
    </FormGroupCustom>
  );
};

export default observer(CabTypeView);
