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

interface VehicleSoldDialog {
  dialogType: DialogTypeEnum;
  carName: string;
  title: string;
  contentMsg: string;
  dialogAction: (dialogType: DialogTypeEnum) => void;
}

const primaryWhite = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.white;

const grayThree = (props: { theme: ThemeProps }): string =>
  props.theme.colors.gray.three;

const grayTwo = (props: { theme: ThemeProps }): string =>
  props.theme.colors.gray.two;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${primaryWhite};
  z-index: 1;
  position: relative;
  width: 580px;
  height: 432px;
  ${addStyleForMobile(`
    height: 100%;
      width: 100%;
  `)}
`;

const DialogTitle = styled(Heading.Three)`
  padding: 24px 138px 0px;
  text-align: center;
  ${addStyleForMobile(`
    padding: 25px 0px 0px 0px;
    font-size: 24px;
  `)}
`;

const Content = styled(Body.Regular)`
  margin: 8px 56px;
  width: 480px;
  height: 78px;
  text-align: center;
  ${addStyleForMobile(`
    width: 300px;
  `)}
`;

const Line = styled.hr`
  background-color: ${grayThree};
  height: 1px;
  margin: 24px 0 24px 0px;
  width: 480px;
  align-self: center;
  ${addStyleForMobile(`
    width: 300px;
  `)}
`;

const IconContainer = styled.div`
  align-self: center;
  margin: 32px 0px;
`;

const Car = styled.img`
  width: 80px;
  height: 80px;
`;

const StyledButton = styled(Button.Primary)`
  margin: 0px 100px;
  width: 380px;
  ${addStyleForMobile(`
  width: 300px;
  margin: 0px 50px 20px;
  `)}
`;
const Close = styled.a`
  position: absolute;
  top: 24px;
  right: 24px;
  cursor: pointer;
`;

const CloseIcon = styled(Icon)`
  fill: ${grayTwo};
`;

const {
  publicRuntimeConfig: { BASE_PATH },
} = getConfig();

export const VehicleSold: React.FC<VehicleSoldDialog> = ({
  carName,
  dialogAction,
  title,
  contentMsg,
  dialogType,
}) => {
  return (
    <Container>
      <Close onClick={(): void => dialogAction(dialogType)}>
        <CloseIcon icon={Icons.CLOSE_LARGE} />
      </Close>
      <DialogTitle>{title}</DialogTitle>
      <Line />
      <Content>
        <Body.Regular bold>{carName}</Body.Regular> {contentMsg}
      </Content>
      <IconContainer>
        <Car src={`${BASE_PATH}/assets/icons/car-search.svg`} />
      </IconContainer>
      <StyledButton onClick={(): void => dialogAction(dialogType)}>
        OK
      </StyledButton>
    </Container>
  );
};

export default VehicleSold;
