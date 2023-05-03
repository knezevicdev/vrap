import { addStyleForMobile, addStyleForTablet } from '@vroom-web/ui-lib';
import styled from 'styled-components';

import Icon from '../../../../core/Icon';

export const Container = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  background: rgba(4, 16, 34, 0.7);
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

export const Modal = styled.div`
  margin: 5% auto;
  max-width: 592px;
  width: 100%;
  background-color: #ffffff;
  border: 1px solid rgb(214, 215, 218);
  box-shadow: rgba(0, 0, 0, 0.2) 0 0 3px 0;
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

export const PanelGuide = styled.img`
  width: 100%;
`;

export const DialogContent = styled.div`
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

export const CloseDialog = styled.div`
  position: absolute;
  right: 30px;
  top: 40px;
  color: #041022;
  cursor: pointer;
`;

export const StyledIcon = styled(Icon)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
`;

export const CloseButtonContainer = styled.div`
  position: relative;
`;

export const SectionTitle = styled.h1`
  padding: 18px 0 18px 0;
  text-align: center;
  font-family: Vroom-Sans, sans-serif;
  font-size: 36px;
  line-height: 36px;
  letter-spacing: 1px;
`;

export const SectionDesc = styled.div`
  font-family: 'Calibre-Regular', sans-serif;
  font-size: 18px;
  line-height: 25px;
  letter-spacing: 0.25px;
  margin: 20px 0 30px 0;

  ${addStyleForMobile(`
    padding: 0 20px;
  `)}
`;
