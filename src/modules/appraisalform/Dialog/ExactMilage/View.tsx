import { addStyleForMobile, Button } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import getConfig from 'next/config';
import React from 'react';
import styled from 'styled-components';

import { displayNumber } from '../../components/formatting';

const { publicRuntimeConfig } = getConfig();
const BASE_PATH = publicRuntimeConfig.NEXT_PUBLIC_BASE_PATH;

const Container = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  background: rgba(4, 16, 34, 0.7);
  width: 100%;
  height: 100%;
  display: flex;
  ${addStyleForMobile(`
      display: flex;
      flex-direction: column;
      align-items: center;
  `)};
`;

const Modal = styled.div`
  margin: auto;
  max-width: 580px;
  max-height: 100%;
  width: 100%;
  background-color: #ffffff;
  border: 1px solid rgb(214, 215, 218);
  boxshadow: rgba(0, 0, 0, 0.2) 0px 0px 3px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  ${addStyleForMobile(`
      width: 100%;
      height: 100%;
      max-height: 572px;
      margin: auto;
  `)};
`;

const ExactMileageContent = styled.div`
  background: #fff;
  padding: 50px;
  width: 580px;
  text-align: center;
  position: relative;
  overflow-y: scroll;
  ${addStyleForMobile(`
      width: 100%;
      height: 100%;
      padding: 40px 30px;
  `)};
`;

const carTimerIcon = `${BASE_PATH}/icons/car-timer.svg`;

const ExactMileageImage = styled.div`
  background-image: url(${carTimerIcon});
  width: 75px;
  height: 66px;
  margin: 0 auto 20px;
`;

const ExactMileageTitle = styled.div`
  font-family: Vroom-Sans;
  font-size: 42px;
  line-height: 46px;
  letter-spacing: 1px;
`;

const Line = styled.hr`
  border: 0;
  border-top: 1px solid #0000001a;
  margin: 15px 0;
`;

const ExactMileageDesc = styled.div`
  font-family: 'Calibre-Regular';
  font-size: 18px;
  line-height: 25px;
  letter-spacing: 0.25px;
  margin-top: 30px;
`;

const CorrectMileageLink = styled.a`
  color: #e7131a;
  cursor: pointer;
  text-decoration: none;
`;

const UpdateMileageCTA = styled(Button.Primary)`
  width: 200px;
  display: flex;
  margin: 25px auto 15px;
  justify-content: center;
  align-items: center;
  font-family: Calibre-Semibold;
`;

interface Props {
  closeModalHandler: any;
  strictDialog: boolean;
  enteredMiles: any;
  mileageCorrect: () => void;
  updateMileage: () => void;
}
const DialogView: React.FC<Props> = ({
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

export default observer(DialogView);
