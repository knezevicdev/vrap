import React from 'react';

import ShipmentsModel from '../../Model';
import Model from './Model';
import View from './View';
import viewModel from './VviewModel';

interface Props {
  shipmentId: number;
  shipmentStopId: number;
  shipmentsModel: ShipmentsModel;
}

const Deliver: React.FC<Props> = ({
  shipmentId,
  shipmentStopId,
  shipmentsModel,
}) => (
  <View {...viewModel(new Model(shipmentId, shipmentStopId, shipmentsModel))} />
);

export default Deliver;
