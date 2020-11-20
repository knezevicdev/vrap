import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import styled, { css } from 'styled-components';

import { Body } from '../Typography';

export const Color: Story = () => {
  return (
    <Container>
      <Section>Primary</Section>
      <Row>
        <Box>
          <PrimaryRed />
          <BodyRegularSemi>Vroom red</BodyRegularSemi>
          <BodyRegularSemi>#E7131A</BodyRegularSemi>
          <BodyRegularSemi>(AAA pass)</BodyRegularSemi>
          <BodyRegularSemi>Primary CTA/ text link</BodyRegularSemi>
        </Box>
        <Box>
          <PrimaryBlack />
          <BodyRegularSemi>Vroom black</BodyRegularSemi>
          <BodyRegularSemi>#041022</BodyRegularSemi>
          <BodyRegularSemi>(AAA pass)</BodyRegularSemi>
          <BodyRegularSemi>Text / tab</BodyRegularSemi>
        </Box>
        <Box>
          <PrimaryWhite />
          <BodyRegularSemi>White</BodyRegularSemi>
          <BodyRegularSemi>#FFFFFF</BodyRegularSemi>
          <BodyRegularSemi>(AAA pass)</BodyRegularSemi>
        </Box>
      </Row>
      <Space />
      <Section>Secondary</Section>
      <Row>
        <Box>
          <SecondaryBlue />
          <BodyRegularSemi>Vroom blue</BodyRegularSemi>
          <BodyRegularSemi>#1960D0</BodyRegularSemi>
          <BodyRegularSemi>(AAA pass)</BodyRegularSemi>
          <BodyRegularSemi>Field focus</BodyRegularSemi>
        </Box>
        <Box>
          <SecondaryGreen />
          <BodyRegularSemi>Green</BodyRegularSemi>
          <BodyRegularSemi>#308406</BodyRegularSemi>
          <BodyRegularSemi>(AAA pass)</BodyRegularSemi>
          <BodyRegularSemi>Confirm / Success</BodyRegularSemi>
        </Box>
        <Box>
          <SecondaryOrange />
          <BodyRegularSemi>Orange</BodyRegularSemi>
          <BodyRegularSemi>#F26900</BodyRegularSemi>
          <BodyRegularSemi>(AA pass)</BodyRegularSemi>
          <BodyRegularSemi>Error</BodyRegularSemi>
        </Box>
        <Box>
          <SecondaryYellow />
          <BodyRegularSemi>Yellow</BodyRegularSemi>
          <BodyRegularSemi>#FFD400</BodyRegularSemi>
          <BodyRegularSemi>(AA pass)</BodyRegularSemi>
          <BodyRegularSemi>Warning</BodyRegularSemi>
        </Box>
        <Box>
          <SecondaryRed />
          <BodyRegularSemi>Happy red</BodyRegularSemi>
          <BodyRegularSemi>#FC4349</BodyRegularSemi>
          <BodyRegularSemi>(AA pass)</BodyRegularSemi>
          <BodyRegularSemi>Hover CTA button</BodyRegularSemi>
        </Box>
        <Box>
          <SecondaryPink />
          <BodyRegularSemi>Coral pink</BodyRegularSemi>
          <BodyRegularSemi>#FEE8E9</BodyRegularSemi>
          <BodyRegularSemi>(AA pass)</BodyRegularSemi>
          <BodyRegularSemi>Background color</BodyRegularSemi>
        </Box>
      </Row>
      <Space />
      <Section>Neutral</Section>
      <Row>
        <Box>
          <NeutralGrayOne />
          <BodyRegularSemi>Gray 1</BodyRegularSemi>
          <BodyRegularSemi>#6C717A</BodyRegularSemi>
          <BodyRegularSemi>(AA pass)</BodyRegularSemi>
          <BodyRegularSemi>Text link</BodyRegularSemi>
        </Box>
        <Box>
          <NeutralGrayTwo />
          <BodyRegularSemi>Gray 2</BodyRegularSemi>
          <BodyRegularSemi>#999DA3</BodyRegularSemi>
          <BodyRegularSemi>(AA pass)</BodyRegularSemi>
          <BodyRegularSemi>Supportive text</BodyRegularSemi>
          <BodyRegularSemi>Section titles</BodyRegularSemi>
        </Box>
        <Box>
          <NeutralGrayThree />
          <BodyRegularSemi>Gray 3</BodyRegularSemi>
          <BodyRegularSemi>#D6D7DA</BodyRegularSemi>
          <BodyRegularSemi>(AA pass)</BodyRegularSemi>
          <BodyRegularSemi>Form and card borders</BodyRegularSemi>
        </Box>
        <Box>
          <NeutralGrayFour />
          <BodyRegularSemi>Gray 4</BodyRegularSemi>
          <BodyRegularSemi>#F5F5F5</BodyRegularSemi>
          <BodyRegularSemi>(AAA pass)</BodyRegularSemi>
          <BodyRegularSemi>Form default</BodyRegularSemi>
          <BodyRegularSemi>background colors</BodyRegularSemi>
        </Box>
      </Row>
    </Container>
  );
};

export default {
  title: 'DesignSystem/Foundation/Color',
} as Meta;

const Section = styled(Body.Regular)`
  color: ${({ theme: { colors } }): string => colors.neutral.gray2};
  letter-spacing: 1.25px;
  text-transform: uppercase;
  font-weight: 600;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  margin-top: 16px;
`;

const Space = styled.div`
  margin: 8px 0;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 16px;
`;

const BodyRegularSemi = styled(Body.Regular)`
  font-weight: 600;
`;

const boxBase = css`
  min-width: 200px;
  max-width: 200px;
  min-height: 200px;
  max-height: 200px;
`;

const PrimaryRed = styled.div`
    ${boxBase}
    background: ${({ theme: { colors } }): string => colors.primary.red};
`;

const PrimaryBlack = styled.div`
    ${boxBase}
    background: ${({ theme: { colors } }): string => colors.primary.black};
`;

const PrimaryWhite = styled.div`
    ${boxBase}
    background: ${({ theme: { colors } }): string => colors.primary.white};
    border: 1px solid ${({ theme: { colors } }): string =>
      colors.primary.black};
    box-sizing: border-box;
`;

const SecondaryBlue = styled.div`
    ${boxBase}
    background: ${({ theme: { colors } }): string => colors.secondary.blue};
`;

const SecondaryGreen = styled.div`
    ${boxBase}
    background: ${({ theme: { colors } }): string => colors.secondary.green};
`;

const SecondaryOrange = styled.div`
    ${boxBase}
    background: ${({ theme: { colors } }): string => colors.secondary.orange};
`;

const SecondaryYellow = styled.div`
    ${boxBase}
    background: ${({ theme: { colors } }): string => colors.secondary.yellow};
`;

const SecondaryRed = styled.div`
    ${boxBase}
    background: ${({ theme: { colors } }): string => colors.secondary.red};
`;

const SecondaryPink = styled.div`
    ${boxBase}
    background: ${({ theme: { colors } }): string => colors.secondary.pink};
`;

const NeutralGrayOne = styled.div`
    ${boxBase}
    background: ${({ theme: { colors } }): string => colors.neutral.gray1};
`;

const NeutralGrayTwo = styled.div`
    ${boxBase}
    background: ${({ theme: { colors } }): string => colors.neutral.gray2};
`;

const NeutralGrayThree = styled.div`
    ${boxBase}
    background: ${({ theme: { colors } }): string => colors.neutral.gray3};
`;

const NeutralGrayFour = styled.div`
    ${boxBase}
    background: ${({ theme: { colors } }): string => colors.neutral.gray4};
`;
