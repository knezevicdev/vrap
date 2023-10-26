import getConfig from 'next/config';
import styled from 'styled-components';

const { publicRuntimeConfig } = getConfig();
const BASE_PATH = publicRuntimeConfig.BASE_PATH;

export const StyledContainer = styled.div`
  height: 100%;
`;

export const ReducedPriceReason = styled.div`
  display: flex;
  padding-bottom: 10px;
  margin: 0 auto;
  max-width: 260px;
  font-family: Calibre-Semibold, sans-serif;
`;

export const Checkmark = styled.div`
  background: url(${`${BASE_PATH}/icons/check-mark-green.svg`}) center no-repeat;
  width: 25px;
  height: 20px;
  margin-right: 5px;
`;

export const Cross = styled.div`
  background: url(${`${BASE_PATH}/icons/red-cross.svg`}) center no-repeat;
  width: 25px;
  height: 20px;
  margin-right: 5px;
`;
