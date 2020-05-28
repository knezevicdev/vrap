import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import React from 'react';

import ChipsViewModel from './ViewModel';

import Typography from 'src/ui/Typography';

const ChipsContainer = styled(Grid)(() => ({
  paddingRight: '8px',
}));

const Clear = styled(Typography)(() => ({
  cursor: 'pointer',
  padding: '8px',
  alignSelf: 'center',
}));

interface Props {
  viewModel: ChipsViewModel;
}

const ChipsView: React.FC<Props> = ({ viewModel }) => {
  const active = viewModel.getActiveFilters();

  if (!active) return null;

  return (
    <ChipsContainer container direction="row" spacing={1}>
      {active.map((chip) => {
        const { display, onDelete } = chip;
        return (
          <Grid item key={display}>
            <Chip
              color="secondary"
              label={display}
              onClick={onDelete}
              onDelete={onDelete}
            />
          </Grid>
        );
      })}
      <Clear
        fontWeight="fontWeightMedium"
        color="secondary.main"
        onClick={viewModel.clearFilters}
      >
        {viewModel.clearButtonLabel}
      </Clear>
    </ChipsContainer>
  );
};

export default observer(ChipsView);
