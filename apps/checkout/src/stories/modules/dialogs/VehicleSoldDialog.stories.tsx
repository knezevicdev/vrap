import React from 'react';
import {dialogInnerContent} from "src/modules/dealValidatorModal/ViewModel";
import {DialogTypeEnum} from "src/modules/dealValidatorModal/types";

import VehicleSoldDialog from 'src/modules/dealValidatorModal/content/VehicleSold';

export const Default = (): JSX.Element => {

  const [year, make, model ] = ["2007", "kia", "Optima"];

  const carName= `${year} ${make} ${model}`;

  const dialogAction = (dialogType: DialogTypeEnum) => {
    console.log("dialogType", dialogType)
  }
  const { title, contentMsg } = dialogInnerContent(DialogTypeEnum.VEHICLE_SOLD);

  return <VehicleSoldDialog  carName={carName}
  dialogAction={dialogAction}
  title= {title ?? ""}
  contentMsg = {contentMsg ?? ""}
  dialogType = {DialogTypeEnum.VEHICLE_SOLD}/>;
};

export default {
  title: 'Checkout/Dialogs/Vehicle Sold',
};
