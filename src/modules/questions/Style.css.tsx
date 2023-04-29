import { Link, Typography } from '@vroom-web/ui-lib';
import styled from 'styled-components';

export const StyledLink = styled(Link.Text)`
  text-decoration: none;

  :hover {
    text-decoration-color: red;
  }
`;

export const StyledContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 40px 0;

  @media (max-width: 599px) {
    flex-direction: column;
  }
`;

export const StyledTitle = styled(Typography.Title.Three)`
  font-size: 16px;
  padding: 10px;
`;

export const StyledHero = styled(Typography.Heading.Three)`
  padding-top: 40px;
  text-align: center;
`;

export const IconSection = styled.div`
  align-items: center;
  display: flex;
  padding: 0 30px;
`;

export const VerticalDivider = styled.div`
  width: 1px;
  height: 40px;
  background-color: #d6d7da;
  margin: 0 20px;

  @media (max-width: 599px) {
    display: none;
  }
`;
