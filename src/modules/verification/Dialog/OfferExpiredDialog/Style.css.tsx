import { addStyleForMobile, Button } from '@vroom-web/ui-lib';
import getConfig from 'next/config';
import styled from 'styled-components';

const { publicRuntimeConfig } = getConfig();
const BASE_PATH = publicRuntimeConfig.BASE_PATH;

export const Container = styled.div`
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

export const Modal = styled.div`
  margin: auto;
  max-width: 580px;
  max-height: 100%;
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
      width: 100%;
      height: 100%;
      max-height: 572px;
      margin: auto;
  `)};
`;

export const PriceExpiredContent = styled.div`
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

export const carOfferIcon = `${BASE_PATH}/icons/car-offer.svg`;

export const PriceExpiredImage = styled.div`
  background: url(${carOfferIcon}) center no-repeat;
  background-size: cover;
  width: 75px;
  height: 66px;
  margin: 0 auto 20px;
`;

export const PriceExpiredTitle = styled.div`
  font-family: Vroom-Sans, sans-serif;
  font-size: 42px;
  line-height: 46px;
  letter-spacing: 1px;
`;

export const Line = styled.hr`
  border: 0;
  border-top: 1px solid #0000001a;
  margin: 15px 0;
`;

export const PriceExpiredDesc = styled.div`
  font-family: 'Calibre-Regular', sans-serif;
  font-size: 18px;
  line-height: 25px;
  letter-spacing: 0.25px;
  margin-top: 30px;
`;

export const GetUpdatedCTA = styled(Button.Primary)`
  display: flex;
  margin: 25px auto 15px;
  justify-content: center;
  align-items: center;
  font-family: Calibre-Semibold, sans-serif;
`;
