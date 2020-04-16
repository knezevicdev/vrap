import { observer } from 'mobx-react';
import React from 'react';

import ViewModel from './ViewModel';

import InternalLink from 'src/ui/InternalLink';
import Typography from 'src/ui/Typography';

interface Props {
  viewModel: ViewModel;
}

const InventoryCountLabel: React.FC<Props> = ({ viewModel }) => {
  const link = viewModel.link();
  return (
    <InternalLink color="textSecondary" href={link.href}>
      <Typography fontWeight="fontWeightMedium" variant="body1">
        {link.label}
      </Typography>
    </InternalLink>
  );
};

export default observer(InventoryCountLabel);
