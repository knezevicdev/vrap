import {
  addStyleForMobile,
  addStyleForTablet,
  Body,
  Heading,
  ThemeProps,
  Title,
} from '@vroom-web/temp-ui-alias-for-checkout';
import React from 'react';
import styled from 'styled-components';

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
  ${addStyleForMobile(`
    padding-bottom: 32px;
  `)}
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1312px;
  margin: 0 64px;
  align-items: center;

  ${addStyleForTablet(`
    width: calc(100% - 128px);
  `)}

  ${addStyleForMobile(`
    margin: 0;
    width: calc(100% - 32px);
  `)}
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 33%;
  max-width: 33%;

  ${addStyleForTablet(`
    min-width: 100%;
    max-width: 100%;
  `)}

  ${addStyleForMobile(`
    min-width: 100%;
    max-width: 100%;
  `)}
`;

const Steps = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;

  ${Step}:not(:last-child) {
    padding-right: 32px;
  }

  ${addStyleForTablet(`
     flex-direction: column;
     ${Step}:not(:first-child) {
        margin-top: 16px;
     }
     
     ${Step}:not(:last-child) {
      padding-right: 0px;
     }
  `)}

  ${addStyleForMobile(`
    flex-direction: column;
    ${Step}:not(:first-child) {
      margin-top: 16px;
    }
     
    ${Step}:not(:last-child) {
      padding-right: 0px;
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
  font-weight: 600;
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
