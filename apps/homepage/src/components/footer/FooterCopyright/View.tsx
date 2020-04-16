import React from 'react';

import FooterCopyrightViewModel from './ViewModel';

import Typography from 'src/ui/Typography';

interface FooterCopyrightViewProps {
  viewModel: FooterCopyrightViewModel;
}

const FooterCopyrightView: React.FC<FooterCopyrightViewProps> = ({
  viewModel,
}) => {
  return (
    <Typography fontWeight="fontWeightLight" variant="overline">
      {viewModel.label()}
    </Typography>
  );
};

export default FooterCopyrightView;
