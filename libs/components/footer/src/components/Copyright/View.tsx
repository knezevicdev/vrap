import React from 'react';

import ViewModel from './ViewModel';

// import Typography from 'src/ui/Typography';

interface Props {
  viewModel: ViewModel;
}

const NavigationView: React.FC<Props> = ({ viewModel }) => {
  return (
    // <Typography fontWeight="fontWeightLight" variant="overline">
    <div>{viewModel.label}</div>
    // </Typography>
  );
};

export default NavigationView;
