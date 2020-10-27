import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import withStyles from '@material-ui/core/styles/withStyles';
import { PopularFeatures as FiltersDataPopularFeatures } from '@vroom-web/catalog-url-integration';
import { observer } from 'mobx-react';
import React from 'react';

import FeaturesViewModel from './ViewModel';

interface Props {
  viewModel: FeaturesViewModel;
}

const Label = withStyles((theme) => ({
  label: {
    fontWeight: theme.typography.fontWeightLight,
    fontSize: '16px',
  },
}))(FormControlLabel);

const CheckboxCustom = withStyles((theme) => ({
  root: {
    color: theme.palette.grey['A100'],
  },
}))(Checkbox);

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
    </FormGroup>
  );
};

export default observer(FeaturesView);
