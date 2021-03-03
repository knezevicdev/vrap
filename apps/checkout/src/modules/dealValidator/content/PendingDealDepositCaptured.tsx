import {
  addStyleForMobile,
  Body,
  Button,
  Heading,
  Icon,
  Icons,
  ThemeProps,
} from '@vroom-web/temp-ui-alias-for-checkout';
import getConfig from 'next/config';
import React from 'react';
import styled from 'styled-components';

import { DialogTypeEnum } from '../types';

interface PendingDealDepositCapturedDialog {
  dialogType: DialogTypeEnum;
  dialogAction: (dialogType: DialogTypeEnum) => void;
  title: string;
  contentMsg: string;
}

const primaryWhite = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.white;

const primaryBlack = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.black;

const Container = styled.div`
  display: grid;
  padding-top: 18px;
  padding-bottom: 48px;
  grid-template-rows: 12px 68px 40px auto 48px;
  grid-gap: 16px;
  max-width: 692px;
  width: 100%;
  justify-items: center;
  background: ${primaryWhite};
  z-index: 1;
  ${addStyleForMobile(`
    height: 100%;
    width: 100%;
`)}
`;

const DialogTitle = styled(Heading.Three)`
  text-align: center;
  ${addStyleForMobile(` 
    font-size: 24px;
`)}
`;

const Content = styled(Body.Regular)`
  margin-left: 32px;
  margin-right: 32px;
  text-align: center;
  ${addStyleForMobile(`
   width: 300px;
`)}
`;

const IconContainer = styled.div`
  align-self: center;
`;

const Car = styled.img`
  width: 68px;
  height: 68px;
`;

const StyledButton = styled(Button.Primary)`
  max-width: 220px;
  width: 100%;
  ${addStyleForMobile(` 
  margin: 0px 50px 20px;
`)}
`;
const Close = styled.a`
  justify-self: right;
  padding-right: 18px;
  cursor: pointer;
`;
const {
  publicRuntimeConfig: { BASE_PATH },
} = getConfig();

const CloseIcon = styled(Icon)`
  fill: ${primaryBlack};
`;

export const PendingDealDepositCaptured: React.FC<PendingDealDepositCapturedDialog> = ({
  dialogType,
  title,
  contentMsg,
  dialogAction,
}) => {
  return (
    <Container>
      <Close onClick={(): void => dialogAction(dialogType)}>
        <CloseIcon icon={Icons.CLOSE_LARGE} />
      </Close>
      <IconContainer>
        <Car src={`${BASE_PATH}/assets/icons/car-reserve.svg`} />
      </IconContainer>
      <DialogTitle>{title}</DialogTitle>
      <Content>{contentMsg}</Content>
      <StyledButton onClick={(): void => dialogAction(dialogType)}>
        OK
      </StyledButton>
    </Container>
  );
};

export default PendingDealDepositCaptured;
