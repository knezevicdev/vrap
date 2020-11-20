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
          <PrimaryBrand />
          <BodyRegularSemi>Brand</BodyRegularSemi>
          <BodyRegularSemi>#E7131A</BodyRegularSemi>
          <BodyRegularSemi>(AAA pass)</BodyRegularSemi>
        </Box>
        <Box>
          <PrimaryBlack />
          <BodyRegularSemi>Black</BodyRegularSemi>
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
          <SecondaryBrand />
          <BodyRegularSemi>Brand</BodyRegularSemi>
          <BodyRegularSemi>#1960D0</BodyRegularSemi>
          <BodyRegularSemi>(AAA pass)</BodyRegularSemi>
        </Box>
        <Box>
          <SecondarySuccess />
          <BodyRegularSemi>Success</BodyRegularSemi>
          <BodyRegularSemi>#308406</BodyRegularSemi>
          <BodyRegularSemi>(AAA pass)</BodyRegularSemi>
        </Box>
        <Box>
          <SecondaryError />
          <BodyRegularSemi>Error</BodyRegularSemi>
          <BodyRegularSemi>#F26900</BodyRegularSemi>
          <BodyRegularSemi>(AA pass)</BodyRegularSemi>
        </Box>
        <Box>
          <SecondaryWarning />
          <BodyRegularSemi>Warning</BodyRegularSemi>
          <BodyRegularSemi>#FFD400</BodyRegularSemi>
          <BodyRegularSemi>(AA pass)</BodyRegularSemi>
        </Box>
      </Row>
      <Space />
      <Section>Gray</Section>
      <Row>
        <Box>
          <GrayOne />
          <BodyRegularSemi>Gray 1</BodyRegularSemi>
          <BodyRegularSemi>#6C717A</BodyRegularSemi>
          <BodyRegularSemi>(AA pass)</BodyRegularSemi>
        </Box>
        <Box>
          <GrayTwo />
          <BodyRegularSemi>Gray 2</BodyRegularSemi>
          <BodyRegularSemi>#999DA3</BodyRegularSemi>
          <BodyRegularSemi>(AA pass)</BodyRegularSemi>
        </Box>
        <Box>
          <GrayThree />
          <BodyRegularSemi>Gray 3</BodyRegularSemi>
          <BodyRegularSemi>#D6D7DA</BodyRegularSemi>
          <BodyRegularSemi>(AA pass)</BodyRegularSemi>
        </Box>
        <Box>
          <GrayFour />
          <BodyRegularSemi>Gray 4</BodyRegularSemi>
          <BodyRegularSemi>#F5F5F5</BodyRegularSemi>
          <BodyRegularSemi>(AAA pass)</BodyRegularSemi>
        </Box>
      </Row>
    </Container>
  );
};

export default {
  title: 'DesignSystem/Foundation/Color',
} as Meta;

const Section = styled(Body.Regular)`
  color: ${({ theme: { colors } }): string => colors.gray.two};
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

const PrimaryBrand = styled.div`
    ${boxBase}
    background: ${({ theme: { colors } }): string => colors.primary.brand};
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

const SecondaryBrand = styled.div`
    ${boxBase}
    background: ${({ theme: { colors } }): string => colors.secondary.brand};
`;

const SecondarySuccess = styled.div`
    ${boxBase}
    background: ${({ theme: { colors } }): string => colors.secondary.success};
`;

const SecondaryError = styled.div`
    ${boxBase}
    background: ${({ theme: { colors } }): string => colors.secondary.error};
`;

const SecondaryWarning = styled.div`
    ${boxBase}
    background: ${({ theme: { colors } }): string => colors.secondary.warning};
`;

const GrayOne = styled.div`
    ${boxBase}
    background: ${({ theme: { colors } }): string => colors.gray.one};
`;

const GrayTwo = styled.div`
    ${boxBase}
    background: ${({ theme: { colors } }): string => colors.gray.two};
`;

const GrayThree = styled.div`
    ${boxBase}
    background: ${({ theme: { colors } }): string => colors.gray.three};
`;

const GrayFour = styled.div`
    ${boxBase}
    background: ${({ theme: { colors } }): string => colors.gray.four};
`;
