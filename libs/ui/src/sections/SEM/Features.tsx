import React from 'react';
import styled from 'styled-components';

import { Body, Hero, Title } from '../../atoms/Typography';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const Table = styled.div`
  display: flex;
  margin-top: 32px;
  width: 100%;
`;

const FixedColumn = styled.div`
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  min-width: 152px;
  @media (max-width: 599px) {
    border-right: solid 1px #d6d7da;
  }
`;

//TODO: Look into scrolling functionality without scrollbar.
const Columns = styled.div`
  display: flex;
  overflow: auto;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 96px;
  max-width: 96px;
`;

const CustomBodySmall = styled(Body.Small)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  max-height: 40px;

  padding-right: 8px;

  &:nth-child(even) {
    background: #f5f5f5;
  }
`;

const CustomTitle = styled(Title.Three)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  max-height: 40px;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  max-height: 40px;

  box-shadow: -1px 0 0 0 #f5f5f5;

  &:nth-child(odd) {
    background: #f5f5f5;
  }
`;

export interface Props {}

export const Features: React.FC<Props> = ({}) => {
  return (
    <Container>
      <Hero.Four>Trim details & features</Hero.Four>
      <Table>
        <FixedColumn>
          <CustomBodySmall>
            Audio & Cruise Controls on steering wheel
          </CustomBodySmall>
          <CustomBodySmall>
            Audio & Cruise Controls on steering wheel
          </CustomBodySmall>
          <CustomBodySmall>
            Audio & Cruise Controls on steering wheel
          </CustomBodySmall>
          <CustomBodySmall>
            Audio & Cruise Controls on steering wheel
          </CustomBodySmall>
          <CustomBodySmall>
            Audio & Cruise Controls on steering wheel
          </CustomBodySmall>
        </FixedColumn>
        <Columns>
          <Column>
            <CustomTitle>Sport</CustomTitle>
            <Icon>icon</Icon>
            <Icon>icon</Icon>
            <Icon></Icon>
            <Icon>icon</Icon>
            <Icon></Icon>
          </Column>
          <Column>
            <CustomTitle>Sport</CustomTitle>
            <Icon>icon</Icon>
            <Icon>icon</Icon>
            <Icon>icon</Icon>
            <Icon></Icon>
            <Icon></Icon>
          </Column>
          <Column>
            <CustomTitle>Sport</CustomTitle>
            <Icon>icon</Icon>
            <Icon>icon</Icon>
            <Icon>icon</Icon>
            <Icon></Icon>
            <Icon></Icon>
          </Column>
          <Column>
            <CustomTitle>Sport</CustomTitle>
            <Icon>icon</Icon>
            <Icon>icon</Icon>
            <Icon>icon</Icon>
            <Icon></Icon>
            <Icon>icon</Icon>
          </Column>
        </Columns>
      </Table>
    </Container>
  );
};
