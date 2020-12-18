import React from 'react';
import styled from 'styled-components';
import { addStyleForMobile, Body, Heading, ThemeProps, Title } from 'vroom-ui';

const grayFour = (props: { theme: ThemeProps }): string =>
  props.theme.colors.gray.four;

const primaryBrand = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.brand;

const primaryWhite = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.white;

const Background = styled.div`
  display: flex;
  background: ${grayFour};
  justify-content: center;
  padding-bottom: 64px;
  margin-bottom: 64px;
  ${addStyleForMobile(`
    padding-bottom: 32px;
    margin-bottom: 32px;
  `)}
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1280px;
  align-items: center;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  min-width: calc(33% - 32px);
  max-width: calc(33% - 32px);
  ${addStyleForMobile(`
    min-width: calc(100% - 32px);
    max-width: calc(100% - 32px);
  `)}
`;

const Steps = styled.div`
  display: flex;
  margin-top: 36px;
  padding: 0 16px;
  ${addStyleForMobile(`
    flex-direction: column;
     margin-top: 32px;
     padding: 0;
     ${Step}:not(:first-child) {
        margin-top: 16px;
     }
  `)}
`;

const StepHeader = styled.div`
  display: flex;
  align-items: center;
`;

const Description = styled(Body.Regular)`
  margin-left: 26px;
`;

const StepNumber = styled(Body.Small)`
  margin-top: 2px;
  background: ${primaryBrand};
  border-radius: 50%;
  width: 18px;
  height: 18px;
  color: ${primaryWhite} !important;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`;

const Header = styled(Heading.Three)`
  ${addStyleForMobile(`
    font-size: 30px !important;
    margin: 0px 32px !important;
  `)}
`;

export interface NextProps {
  heading: string;
  steps: { number: string; title: string; description: string }[];
}

const Next: React.FC<NextProps> = ({ heading, steps }): JSX.Element => {
  return (
    <Background>
      <Container>
        <Header>{heading}</Header>
        <Steps>
          {steps.map((step) => {
            const { number, title, description } = step;
            return (
              <Step key={number}>
                <StepHeader>
                  <StepNumber>{number}</StepNumber>
                  <Title.Three>{title}</Title.Three>
                </StepHeader>
                <Description>{description}</Description>
              </Step>
            );
          })}
        </Steps>
      </Container>
    </Background>
  );
};

export default Next;
