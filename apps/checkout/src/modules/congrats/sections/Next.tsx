import React from 'react';
import styled from 'styled-components';
import { ThemeProps } from 'vroom-ui/src/foundation/themes/types';
import { addStyleForMobile } from 'vroom-ui/src/foundation/themes/Vroom';
import { Body, Heading, Title } from 'vroom-ui/src/foundation/Typography';

const grayFour = (props: { theme: ThemeProps }): string =>
  props.theme.colors.gray.four;

const primaryBrand = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.brand;

const primaryWhite = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.white;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${grayFour};
  align-items: center;
  padding-bottom: 64px;
  margin-bottom: 64px;
  ${addStyleForMobile(`
        padding-bottom: 32px;
        margin-bottom: 32px;
    `)}
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
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

interface Props {
  heading: string;
  steps: { number: string; title: string; description: string }[];
}

const Next: React.FC<Props> = ({ heading, steps }): JSX.Element => {
  return (
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
              <Body.Regular>{description}</Body.Regular>
            </Step>
          );
        })}
      </Steps>
    </Container>
  );
};

export default Next;
