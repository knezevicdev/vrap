import ListItem from '@material-ui/core/ListItem';
import { styled } from '@material-ui/core/styles';
import { MaxAndMin } from '@vroom-web/catalog-url-integration';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import MaxAndMinInputs, { Variant } from '../MaxAndMinInputs';
import MilesViewModel from './ViewModel';

const MilesContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(1, 2),
}));

const Reset = styled(ListItem)(({ theme }) => ({
  flexDirection: 'column',
  '&.MuiListItem-root.Mui-disabled >p': {
    color: theme.palette.grey['A100'],
  },
}));

const Value = styled(Typography)(() => ({
  fontSize: '16px',
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
        <Value fontWeight="fontWeightMedium" color="primary.main">
          {viewModel.resetButtonLabel}
        </Value>
      </Reset>
    </MilesContainer>
  );
};

export default observer(MilesView);
