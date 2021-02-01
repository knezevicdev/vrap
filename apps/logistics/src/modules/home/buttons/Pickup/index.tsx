import React from 'react';

import ShipmentsModel from '../../Model';
import Model from './Model';
import View from './View';
import ViewModel from './ViewModel';

interface Props {
  shipmentId: number;
  shipmentStopId: number;
  shipmentsModel: ShipmentsModel;
}

const Pickup: React.FC<Props> = ({
  shipmentId,
  shipmentStopId,
  shipmentsModel,
}) => (
  <View {...ViewModel(new Model(shipmentId, shipmentStopId, shipmentsModel))} />
);

export default Pickup;
