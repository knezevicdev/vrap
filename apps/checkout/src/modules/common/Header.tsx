import React from 'react';
import styled from 'styled-components';

const Container = styled.header`
  background-color: #ffffff;
  height: 70px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
`;

const Header = (): JSX.Element => {
  return <Container></Container>;
};

export default Header;
