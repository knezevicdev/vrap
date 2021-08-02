import React from 'react';
import styled from 'styled-components';

import ViewModel from './ViewModel';

interface Prop {
  viewModel: ViewModel;
}

const PaymentFooterView: React.FC<Prop> = ({ viewModel }) => {
  return (
    <Container>
      <SectionContainer>
        {viewModel.getSectionLink.map((section, i) => {
          return (
            <a key={i} href={section.href}>
              <span>{section.title}</span>
            </a>
          );
        })}
      </SectionContainer>
      <CopyRightText>{viewModel.copyRightMessage}</CopyRightText>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #041022;
  justify-content: center;
  align-items: center;
  height: 72px;
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  a {
    text-decoration: none;
    margin-right: 24px;
    :last-child {
      margin-right: 0;
    }
    span {
      font-family: Calibre;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #ffffff;
    }
  }
`;

const CopyRightText = styled.div`
  font-family: Calibre;
  font-size: 10px;
  line-height: 12px;
  margin-top: 8px;
  color: #ffffff;
`;

export default PaymentFooterView;
