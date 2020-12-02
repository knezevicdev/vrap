import React from 'react';
import styled from 'styled-components';

import HeaderViewModel from './ViewModel';

import { Button } from 'src/core/Button';

const VehicleDetailsButton = styled(Button.Primary)`
  margin: 0;
  width: 100%;
`;

interface Props {
  viewModel: HeaderViewModel;
}

const VehicleDetailsButtonView: React.FC<Props> = ({ viewModel }) => {
  const { button, handleClick } = viewModel;

  return (
    <VehicleDetailsButton onClick={handleClick}>{button}</VehicleDetailsButton>
  );
};

export default VehicleDetailsButtonView;
