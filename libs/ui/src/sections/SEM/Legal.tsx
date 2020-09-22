import React from 'react';
import styled from 'styled-components';

import { Body } from '../../atoms/Typography';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;

  @media (min-width: 600px) and (max-width: 839px) {
    margin-left: 64px;
    margin-right: 64px;
  }

  @media (max-width: 599px) {
    margin-left: 16px;
    margin-right: 16px;
  }
`;

const Content = styled(Body.Fine)`
  color: #6c717a;
  margin-bottom: 32px;

  @media (min-width: 840px) {
    margin-top: 72px;
  }

  @media (max-width: 839px) {
    margin-top: 64px;
  }
`;

const content = `Unless otherwise noted, information relating to these featured vehicles comes from 
third-party sources, including manufacturer information. 
Product and company names may be trademarks™ or registered® trademarks of 
third-party entities. Use of them does not imply any affiliation with or endorsement by these entities.`;

export const Legal: React.FC = () => {
  return (
    <Container>
      <Content>{content}</Content>
    </Container>
  );
};
