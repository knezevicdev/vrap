import React from 'react';

import ShipmentsModel from '../../Model';
import Model from './Model';
import View from './View';
import ViewModel from './ViewModel';

interface Props {
  shipmentId: number;
  originShipmentStopId: number;
  destinationShipmentStopId: number;
  shipmentsModel: ShipmentsModel;
}

const Pickup: React.FC<Props> = ({
  shipmentId,
  originShipmentStopId,
  destinationShipmentStopId,
  shipmentsModel,
}) => {
  const model = new Model(
    shipmentId,
    originShipmentStopId,
    destinationShipmentStopId,
    shipmentsModel
  );
  return <View {...ViewModel(model)} />;
};

export default Pickup;
