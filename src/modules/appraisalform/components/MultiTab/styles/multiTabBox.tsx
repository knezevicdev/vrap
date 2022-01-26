import { Typography } from '@vroom-web/ui-lib';
import React from 'react';
import styled from 'styled-components';

const MultiTabBox: any = styled.div`
  max-width: 580px;
  border: 1px solid #d6d7da;
  background: #ffffff;
  padding: 20px;
  @media (min-width: 768px) {
    padding: 30px;
  }
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-evenly;
  border-bottom: 1px solid #e0e0e0;
`;

const Body = styled.div`
  padding-top: 20px;
`;

const TabContentSection = styled(({ ...restProps }) => <div {...restProps} />)`
  display: none;

  ${(props) => props.isactive === 'true' && `display: block;`}
`;

const TabButton = styled(({ ...restProps }) => (
  <Typography.Body.Regular {...restProps} />
))`
  font-family: Calibre-Semibold;
  font-size: 18px;
  line-height: 25px;
  letter-spacing: 0.25px;
  font-weight: 600;
  color: #6c717a;
  cursor: pointer;
  text-align: center;
  width: ${(props) => props.tabWidth}%;
  text-transform: uppercase;
  white-space: nowrap;

  ${(props) =>
    props.isactive === 'true' &&
    `
      color: #343957;
      border-bottom: 2px solid #e7131a;
    `}
`;

MultiTabBox.tabs = Tabs;
MultiTabBox.body = Body;
MultiTabBox.tabContentSection = TabContentSection;
MultiTabBox.tabButton = TabButton;

export default MultiTabBox;
