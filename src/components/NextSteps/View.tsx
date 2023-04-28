import { Typography } from '@vroom-web/ui-lib';
import React from 'react';
import styled from 'styled-components';

const NextStepsView = () => {
  return (
    <StyledContainer>
      <StyledHero>next steps</StyledHero>
      <ColoredBullet>
        <StyledTitle>
          <Typography.Title.Three>Verify Ownership</Typography.Title.Three>
        </StyledTitle>
        <StyledDiv>
          <Typography.Body.Regular>
            We&apos;ll request relevant documents and additional information to
            verify vehicle ownership before the price expires.
          </Typography.Body.Regular>
        </StyledDiv>
      </ColoredBullet>
      <ColoredBullet>
        <StyledTitle>
          <Typography.Title.Three>Sign Contracts</Typography.Title.Three>
        </StyledTitle>
        <StyledDiv>
          <Typography.Body.Regular>
            We&apos;ll send an email with a contract to e-Sign, and may require
            some additional paperwork by mail in order to finalize the deal.
          </Typography.Body.Regular>
        </StyledDiv>
      </ColoredBullet>
      <ColoredBullet>
        <StyledTitle>
          <Typography.Title.Three>
            We Pick Up, You Get Paid
          </Typography.Title.Three>
        </StyledTitle>
        <StyledDiv>
          <Typography.Body.Regular>
            We&apos;ll schedule a time to pick up your vehicle. Once we have
            your car, we&apos;ll send your payment within 2-3 business days.
          </Typography.Body.Regular>
        </StyledDiv>
      </ColoredBullet>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  height: 100%;
`;

const StyledHero = styled(Typography.Heading.Three)`
  padding: 0 0 35px 0;
  text-align: center;
`;

const ColoredBullet = styled.div`
  margin: 0;
  padding: 0 25px;
  counter-increment: section;
  position: relative;
  border-left: 1px solid #e7131a;
  margin-left: 20px;

  &:before {
    background-color: #e7131a;
    border-radius: 50%;
    color: white;
    content: counter(section);
    font-family: Calibre;
    height: 20px;
    left: -10px;
    position: absolute;
    text-align: center;
    width: 20px;
  }

  &:last-child {
    border-left: 0;
  }
`;

const StyledDiv = styled.div`
  padding: 0 0 20px 0;
`;

const StyledTitle = styled.div`
  top: -7px;
  position: relative;
`;

export default NextStepsView;
