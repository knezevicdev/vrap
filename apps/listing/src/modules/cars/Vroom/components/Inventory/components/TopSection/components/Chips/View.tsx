import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import ChipsViewModel from './ViewModel';

const ChipsContainer = styled(Grid)(({ theme }) => ({
  paddingRight: theme.spacing(1),
  alignItems: 'center',
}));

const Clear = styled(Typography)(({ theme }) => ({
  cursor: 'pointer',
  padding: theme.spacing(1),
  alignSelf: 'center',
  fontSize: '16px',
}));

const CustomChip = styled(Chip)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: theme.typography.fontWeightMedium,
}));

const CloseIcon = styled(Close)(() => ({
  width: '12px',
  color: 'white',
  marginLeft: '-2px',
  marginRight: '8px',
  marginTop: '2px',
}));

interface Props {
  viewModel: ChipsViewModel;
}

const ChipsView: React.FC<Props> = ({ viewModel }) => {
  const chips = viewModel.getChips();

  if (!chips) return null;

  return (
    <ChipsContainer container direction="row" spacing={1}>
      {chips.map((chip) => {
        const { display, handleDelete } = chip;
        return (
          <Grid item key={display}>
            <CustomChip
              color="secondary"
              label={display}
              onClick={handleDelete}
              onDelete={handleDelete}
              deleteIcon={<CloseIcon />}
            />
          </Grid>
        );
      })}
      <Clear
        fontWeight="fontWeightMedium"
        color="text.primary"
        onClick={viewModel.clearFilters}
      >
        {viewModel.clearButtonLabel}
      </Clear>
    </ChipsContainer>
  );
};

export default observer(ChipsView);
