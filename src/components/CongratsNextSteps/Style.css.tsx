import { Typography } from '@vroom-web/ui-lib';
import styled from 'styled-components';

export const StyledContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  height: 100%;
  padding: 40px 16px;
`;

export const StyledHero = styled(Typography.Heading.Three)`
  padding: 0 0 35px 0;
  text-align: center;
`;

export const StepsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
  gap: 24px;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const ColoredBullet = styled.div`
  margin: 0;
  padding: 0 25px;
  counter-increment: section;
  position: relative;
`;

export const StepNumber = styled.div`
  background-color: #e7131a;
  border-radius: 50%;
  color: white;
  font-family: Calibre, sans-serif;
  height: 20px;
  width: 20px;
  text-align: center;
  margin-right: 8px;
  font-weight: 600;
`;

export const StyledDiv = styled.div`
  padding: 0 0 20px 0;
  border-radius: 50%;
`;

export const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
