import { addStyleForMobile, Button, Typography } from '@vroom-web/ui-lib';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  width: 768px;
  padding: 40px;
  border: solid 1px #d6d7da;
  margin-bottom: 20px;
  @media (max-width: 1020px) {
    max-width: 100%;
    padding: 30px 24px;
    margin: 0 10px;
  }

  @media (max-width: 720px) {
    margin: 0;
  }
`;

export const SubmitButton = styled(Button.Primary)`
  margin: 24px 0 20px 0;
  padding: 6px 12px;
  border: none;
  display: inline-block;
  cursor: pointer;
  width: 280px;
  height: 40px;
  background-color: #d6d7da;
  font-family: Calibre-Semibold;
  font-weight: normal;
  text-align: center;
  line-height: 1;
  letter-spacing: 1.8px;
  min-width: 143px;
  color: #fff !important;
  text-transform: uppercase;
  white-space: nowrap;
  user-select: none;
  transition: color 0.1s, background-color 0.1s;
  box-shadow: none;
  &:not([disabled]) {
    background: #e7131a;
    color: #fff;
    &:hover {
      background: #fc4349;
    }
  }

  :enabled {
    background-color: #e7131a;
    &:hover {
      background-color: #d01118;
    }
  }
`;

export const Title = styled(Typography.Heading.Three)`
  font-style: italic;
  font-family: Vroom-Sans;
  font-weight: 800;
  line-height: 36px;
  padding: 0 0 24px 0;
  @media (max-width: 767px) {
    padding: 16px 0;
    text-align: center;
    font-size: 24px;
    line-height: 24px;
  }
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #d6d7da;
`;

export const SubmitContainer = styled.div`
  text-align: center;
  width: 100%;
  position: fixed;
  background: white;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e0e0e0;
`;

export const TextContainer = styled.p`
  margin: auto;
  margin-bottom: 15px;
  font-family: Calibre-Regular;
  font-size: 13px;
  color: #041022;
  cursor: pointer;
  text-align: center;
  line-height: 15px;
  letter-spacing: 0.35px;
  width: 585px;
  a {
    color: #e7131a;
    text-decoration: none;
    padding: 0 2px;
  }
  ${addStyleForMobile(`
    width: 100%;
    padding: 0 10px;
  `)}
`;

export const WhiteBox = styled.div`
  position: fixed;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  text-align: center;
  opacity: 0.7;
  background-color: #fff;
  z-index: 99;
`;

export const SpinnerContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 100;
  transform: translate(-50%, -50%);
`;
