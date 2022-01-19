import React from 'react';

import View from './View';

interface Props {
  closeModalHandler: any;
  strictDialog: boolean;
  enteredMiles: any;
  mileageCorrect: () => void;
  updateMileage: () => void;
}

const Dialog: React.FC<Props> = ({
  closeModalHandler,
  strictDialog,
  enteredMiles,
  mileageCorrect,
  updateMileage,
}) => {
  return (
    <View
      closeModalHandler={closeModalHandler}
      strictDialog={strictDialog}
      enteredMiles={enteredMiles}
      mileageCorrect={mileageCorrect}
      updateMileage={updateMileage}
    />
  );
};

export default Dialog;
