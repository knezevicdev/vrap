import { Typography } from '@vroom-web/ui-lib';
import styled from 'styled-components';

export const StyledContainer = styled.div`
  height: 100%;
`;

export const StyledHero = styled(Typography.Heading.Three)`
  padding: 0 0 35px 0;
  text-align: center;
`;

export const ColoredBullet = styled.div`
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

export const StyledDiv = styled.div`
  padding: 0 0 20px 0;
`;

export const StyledTitle = styled.div`
  top: -7px;
  position: relative;
`;
