import React from 'react';

import ShipmentsModel from '../../Model';
import Model from './Model';
import View from './View';
import ViewModel from './ViewModel';

interface Props {
  shipmentId: number;
  shipmentsModel: ShipmentsModel;
}

const Cancel: React.FC<Props> = ({ shipmentId, shipmentsModel }) => (
  <View {...ViewModel(new Model(shipmentId, shipmentsModel))} />
);

export default Cancel;
