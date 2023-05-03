import { observer } from 'mobx-react';
import React from 'react';

import { displayNumber } from '../../components/formatting';
import {
  Container,
  CorrectMileageLink,
  ExactMileageContent,
  ExactMileageDesc,
  ExactMileageImage,
  ExactMileageTitle,
  Line,
  Modal,
  UpdateMileageCTA,
} from './Style.css';

interface Props {
  closeModalHandler: any;
  strictDialog: boolean;
  enteredMiles: any;
  mileageCorrect: () => void;
  updateMileage: () => void;
}
const ExactMileageDialog: React.FC<Props> = ({
  closeModalHandler,
  strictDialog,
  enteredMiles,
  mileageCorrect,
  updateMileage,
}) => {
  const displayEnteredMiles = displayNumber(enteredMiles);
  const afterMilesDesc = strictDialog
    ? 'you entered is lower than our partner’s records indicate. If you\'re sure your mileage is correct, please get in touch with Carfax to correct this discrepancy."'
    : 'you entered is lower than our partner’s records indicate. Please check to see if the mileage you entered is correct.';
  const hideExactMileageDialog = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    mileageCorrect();
    closeModalHandler();
  };

  const handleUpdateMiles = () => {
    updateMileage();
    closeModalHandler();
  };

  return (
    <Container>
      <Modal>
        <ExactMileageContent>
          <ExactMileageTitle>
            <div>are you sure your mileage is correct?</div>
          </ExactMileageTitle>
          <Line />
          <ExactMileageImage />
          <ExactMileageDesc>
            The mileage of&nbsp;
            {displayEnteredMiles}&nbsp;
            {afterMilesDesc}
          </ExactMileageDesc>
          <UpdateMileageCTA onClick={handleUpdateMiles}>
            My mileage is correct
          </UpdateMileageCTA>
          {!strictDialog && (
            <CorrectMileageLink onClick={hideExactMileageDialog} href="#">
              Update Mileage
            </CorrectMileageLink>
          )}
        </ExactMileageContent>
      </Modal>
    </Container>
  );
};

export default observer(ExactMileageDialog);
