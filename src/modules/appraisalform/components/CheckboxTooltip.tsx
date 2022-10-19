import React, { ReactElement } from 'react';
import styled from 'styled-components';

type Props = {
  children: string;
};

const CheckboxTooltip = ({ children }: Props): ReactElement => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.p`
  margin: 0;
  font-size: 14px;
  text-align: left;
  line-height: 1.71;
  letter-spacing: 0.3px;
  position: relative;
  left: 27px;
`;

export default CheckboxTooltip;
