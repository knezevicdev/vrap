import { addStyleForMobile, addStyleForTablet } from '@vroom-web/ui-lib';
import React from 'react';
import styled from 'styled-components';

import { lang } from './PanelsDialog.language';

import Icon, { Icons } from 'src/core/Icon';

interface Props {
  closeModalHandler: () => void;
}

const PanelsDialog: React.FC<Props> = ({ closeModalHandler }) => {
  const handleOnKeyDown = (e: any) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      closeModalHandler();
    }
  };

  return (
    <Container>
      <Modal>
        <DialogContent className="fs-unmask">
          <CloseDialog
            onClick={(): void => closeModalHandler()}
            onKeyDown={handleOnKeyDown}
            data-qa="exact milage close"
            role="button"
            tabIndex={0}
          >
            <CloseButtonContainer>
              <StyledIcon icon={Icons.ClOSE_LARGE} />
            </CloseButtonContainer>
          </CloseDialog>
          <div>
            <SectionTitle>{lang.title}</SectionTitle>
            <SectionDesc>{lang.desc}</SectionDesc>
            <PanelGuide
              alt=""
              src="https://www.vroom.com/static-assets/images/sell-us-your-car/body-panels-guide.jpg"
            />
          </div>
        </DialogContent>
      </Modal>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  background: rgba(4, 16, 34, 0.7);
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const Modal = styled.div`
  margin: 5% auto;
  max-width: 592px;
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
        top: 10%;
        width: 100%;
        max-width: 363px;
        height: auto;
        max-height: none;
        padding: 0;
    `)}
`;

const PanelGuide = styled.img`
  width: 100%;
`;

const DialogContent = styled.div`
  position: relative;
  padding: 0 50px 0 50px;
  max-width: 580px;
  background-color: #fff;
  text-align: center;

  ${addStyleForTablet(`
    padding: 0 35px 10px 35px;
  `)}

  ${addStyleForMobile(`
    padding: 0;
    height: 80%;
    width: 95%;
    max-width: 100%;
    display: flex;
    justify-content: center;
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

const SectionTitle = styled.h1`
  padding: 18px 0 18px 0;
  text-align: center;
  font-family: Vroom-Sans;
  font-size: 36px;
  line-height: 36px;
  letter-spacing: 1px;
`;

const SectionDesc = styled.div`
  font-family: 'Calibre-Regular';
  font-size: 18px;
  line-height: 25px;
  letter-spacing: 0.25px;
  margin: 20px 0 30px 0;

  ${addStyleForMobile(`
    padding: 0 20px;
  `)}
`;

export default PanelsDialog;
