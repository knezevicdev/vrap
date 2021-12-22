import { Typography } from '@vroom-web/ui-lib';
import styled from 'styled-components';

const MultiTabSlider = styled.div`
  max-width: 580px;
  background: #ffffff;
`;

const Tabs = styled.div`
  display: flex;
  box-sizing: border-box;
  height: 31px;
  border: 1px solid #d6d7da;
  border-radius: 20px;
  background-color: #f5f5f5;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.08);
`;

const Body = styled.div`
  padding-top: 20px;
`;

const TabContentSection = styled.div`
  display: none;

  ${(props) => props.isActive === true && `display: block;`}
`;

const TabButton = styled(Typography.Body.Regular)`
  font-size: 14px;
  line-height: 14px;
  letter-spacing: 1px;
  color: #6c717a;
  cursor: pointer;
  line-height: 31px;
  text-align: center;
  text-transform: uppercase;
  white-space: nowrap;
  width: ${(props) => props.tabWidth}%;
  min-width: 145px;

  ${(props) =>
    props.isActive === true &&
    `
      background-color: #FFFFFF;
      border-radius: 20px;
      border: 1px solid #041022;
      box-shadow: 0 1px 2px 0 rgba(0,0,0,0.08);
      height: 31px;
    `}
`;

MultiTabSlider.tabs = Tabs;
MultiTabSlider.body = Body;
MultiTabSlider.tabContentSection = TabContentSection;
MultiTabSlider.tabButton = TabButton;

export default MultiTabSlider;
