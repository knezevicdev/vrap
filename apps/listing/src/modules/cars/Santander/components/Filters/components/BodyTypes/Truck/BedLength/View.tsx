import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import React from 'react';

import BedLengthViewModel from './ViewModel';

interface Props {
  viewModel: BedLengthViewModel;
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

const BedLengthView: React.FC<Props> = ({ viewModel }) => {
  return (
    <FormGroupCustom>
      {viewModel.getBedLengths().map((label) => {
        // const checked = null;
        const { display, filtersDataValue } = label;

        return (
          <Label
            key={display}
            labelPlacement="start"
            control={
              <CheckboxCustom
                // checked={checked}
                // onChange={handleCheckboxChange}
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

export default observer(BedLengthView);
