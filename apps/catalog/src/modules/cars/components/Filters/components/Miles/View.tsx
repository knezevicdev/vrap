import ListItem from '@material-ui/core/ListItem';
import { styled } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import React from 'react';

import MaxAndMinInputs, { Variant } from '../MaxAndMinInputs';
import MilesViewModel from './ViewModel';

import { MaxAndMin } from 'src/modules/cars/utils/url';
import Typography from 'src/ui/Typography';

const MilesContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: theme.spacing(2),
}));

const Reset = styled(ListItem)(() => ({
  flexDirection: 'column',
}));

interface Props {
  viewModel: MilesViewModel;
}

const MilesView: React.FC<Props> = ({ viewModel }) => {
  const handleResetClick = (): void => {
    viewModel.handleResetClick();
  };

  const handleMaxAndMinInputsChange = (values?: MaxAndMin): void => {
    viewModel.handleInputsDone(values);
  };

  return (
    <MilesContainer>
      <MaxAndMinInputs
        inputErrorLabel={viewModel.errorLabel}
        maxInputPlaceholder={viewModel.maxInputPlaceholder}
        maxOnlyInputLabel={viewModel.maxOnlyInputLabel}
        onChange={handleMaxAndMinInputsChange}
        range={viewModel.range}
        step={viewModel.step}
        variant={Variant.MAX_ONLY}
        value={viewModel.getMaxAndMinInputsValue()}
      />
      <Reset
        button
        onClick={handleResetClick}
        disabled={viewModel.isResetButtonDisabled()}
      >
        <Typography fontWeight="fontWeightMedium" color="secondary.main">
          {viewModel.resetButtonLabel}
        </Typography>
      </Reset>
    </MilesContainer>
  );
};

export default observer(MilesView);
