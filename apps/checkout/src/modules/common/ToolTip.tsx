import { Body, ThemeProps } from '@vroom-web/temp-ui-alias-for-checkout';
import React from 'react';
import styled from 'styled-components';

const primaryBlack = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.black;

const ToolTipText = styled(Body.Small)`
  white-space: nowrap;
  background-color: ${primaryBlack};
  color: #fff;
  text-align: center;
  padding: 8px;
  line-height: 14px;
  position: absolute;
  z-index: 1;
  bottom: 150%;
  left: 50%;
  transform: translateX(-50%);
  &:after {
    content: ' ';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${primaryBlack} transparent transparent transparent;
  }
`;

const Container = styled.div`
  position: relative;
  svg {
    display: block;
  }
  ${ToolTipText} {
    visibility: hidden;
  }
  &:hover ${ToolTipText} {
    visibility: visible;
  }
`;

interface Props {
  component: string | JSX.Element;
  tooltipText: string | JSX.Element;
}

const ToolTip = ({ component, tooltipText }: Props): JSX.Element => {
  return (
    <Container>
      {component}
      <ToolTipText>{tooltipText}</ToolTipText>
    </Container>
  );
};

export default ToolTip;
