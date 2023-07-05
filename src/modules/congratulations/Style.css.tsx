import { ThemeProps } from '@vroom-web/ui-lib';
import getConfig from 'next/config';
import styled from 'styled-components';

const { publicRuntimeConfig } = getConfig();
const BASE_PATH = publicRuntimeConfig.BASE_PATH;
export const primaryWhite = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.white;

export const grayFour = (props: { theme: ThemeProps }): string =>
  props.theme.colors.gray.four;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  background-color: ${grayFour};
`;

export const HeroContainer = styled.div`
  background-size: 100% 40%;
  background-repeat: no-repeat;
  background-image: url('${BASE_PATH}/images/offer-hero.png');
  width: 100%;

  @media (max-width: 768px) {
    background-size: 100% 200px;
    background-image: url('${BASE_PATH}/images/offer-hero.png');
  }
`;

export const CongratsContainer = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  position: relative;

  @media (max-width: 1024px) {
    flex-direction: column;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const CongratsDetailContainer = styled.div`
  margin-top: 56px;
  background-color: ${primaryWhite};
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
  flex-basis: 60%;
  padding: 50px;
  z-index: 1;
  margin: 24px;

  @media (max-width: 768px) {
    padding: 80px 20px;
  }
`;

export const ProgressiveWrapper = styled.div`
  flex-basis: 60%;
  margin: 0 24px 24px;
`;
