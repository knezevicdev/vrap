import { addStyleForMobile, Button } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import { car_timer_icon } from '../../assets/assets';
import { displayNumber } from '../../components/formatting';
import { lang } from './ExactMilageDialog.language';

import Icon, { Icons } from 'src/core/Icon';

const Container = styled.div`
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  background: rgba(4, 16, 34, 0.7);
  width: 100%;
  height: 100%;
`;

const Modal = styled.div`
  margin: 12.5% auto;
  padding: 32px 64px;
  max-width: 592px;
  width: 100%;
  max-height: 370px;
  background-color: #ffffff;
  border: 1px solid rgb(214, 215, 218);
  border-bottom: 4px solid #e7131a;
  boxshadow: rgba(0, 0, 0, 0.2) 0px 0px 3px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  ${addStyleForMobile(`
        top: 20%;
        width: 100%;
        max-width: 363px;
        height: 100%;
        max-height: 409px;
        padding: 62px 16px;
    `)}
`;

const CloseDialog = styled.div`
  position: absolute;
  right: 30px;
  top: 40px;
  color: #041022;
  cursor: pointer;
`;

const StyledIcon = styled(Icon)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
`;

const CloseButtonContainer = styled.div`
  position: relative;
`;

const ExactMileageContent = styled.div`
  background: #fff;
  padding: 50px;
  width: 580px;
  text-align: center;
  border: 1px solid #e0e0e0;
  position: relative;
`;

const ExactMileageImage = styled.div`
  background-image: url(${car_timer_icon});
  width: 75px;
  height: 66px;
  margin: 0 auto 20px;
`;

const ExactMileageTitle = styled.div`
  font-family: 'Vroom-Sans';
  font-size: 42px;
  line-height: 46px;
  letter-spacing: 1px;
`;

const Line = styled.hr`
  border-color: '#d6d7da';
  margin: 15px 0;
`;

const ExactMileageDesc = styled.div`
  font-family: 'Calibre-Regular';
  font-size: 18px;
  line-height: 25px;
  letter-spacing: 0.25px;
  margin-top: 30px;
`;

const CorrectMileageLink = styled(Button.Bare)`
  color: '#e7131a';
  cursor: pointer;
`;

const UpdateMileageCTA = styled(Button.Primary)`
  width: 200px;
  display: flex;
  margin: 25px auto 10px;
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
    ? lang.strictDescAfterMiles
    : lang.descAfterMiles;

  const hideExactMileageDialog = () => {
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
        <CloseDialog
          onClick={(): void => closeModalHandler()}
          data-qa="exact milage close"
        >
          <CloseButtonContainer>
            <StyledIcon icon={Icons.ClOSE} />
          </CloseButtonContainer>
        </CloseDialog>
        <ExactMileageContent>
          <ExactMileageTitle>
            <div>{lang.titleAreYouSure}</div>
          </ExactMileageTitle>
          <Line />
          <ExactMileageImage />
          <ExactMileageDesc>
            {lang.descBeforeMiles}&nbsp;
            {displayEnteredMiles}&nbsp;
            {afterMilesDesc}
          </ExactMileageDesc>
          <UpdateMileageCTA onClick={handleUpdateMiles}>
            {lang.updateMileage}
          </UpdateMileageCTA>
          {!strictDialog && (
            <CorrectMileageLink onClick={hideExactMileageDialog}>
              {lang.mileageIsCorrect}
            </CorrectMileageLink>
          )}
        </ExactMileageContent>
      </Modal>
    </Container>
  );
};

export default observer(DialogView);
