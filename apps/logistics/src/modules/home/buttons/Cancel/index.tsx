import React from 'react';

import ShipmentsModel from '../../Model';
import Model from './Model';
import View from './View';
import viewModel from './ViewModel';

interface Props {
  shipmentId: number;
  shipmentsModel: ShipmentsModel;
}

const Cancel: React.FC<Props> = ({ shipmentId, shipmentsModel }) => (
  <View {...viewModel(new Model(shipmentId, shipmentsModel))} />
);

export default Cancel;
