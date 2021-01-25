import React from 'react';

import ShipmentsModel from '../../Model';
import Model from './Model';
import View from './View';
import viewModel from './ViewModel';

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
  <View {...ViewModel(new Model(shipmentId, shipmentStopId, shipmentsModel))} />
);

export default Deliver;
