import { Button, Icon, Link, Typography } from '@vroom-web/ui-lib';
import styled from 'styled-components';

export const StyledContainer = styled.div`
  height: 100%;
  text-align: center;
`;

export const StyledIcon = styled(Icon)`
  padding: 20px;
`;

export const StyledButton = styled(Button.Primary)`
  margin: 30px 0;
  max-width: 300px;
  background-color: #308406;
  white-space: normal;
  width: 100%;

  &:hover {
    background-color: #309706;
  }
`;

export const FullButton = styled(Button.Primary)`
  margin: auto;
  width: 100%;
`;

export const StickyDetails = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;

export const StickyContent = styled.div`
  padding: 5px 20px;
`;

export const StyledLegal = styled.div`
  max-width: 500px;
  text-align: left;
  margin: auto;
  > span {
    line-height: 12px;
  }
`;

export const StickyFooter = styled.div`
  background: white;
  border-top: 2px solid #d6d7da;
  bottom: 0;
  display: none;
  left: 0;
  position: fixed;
  width: 100%;
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const ContentText = styled(Typography.Body.Regular)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  max-width: 500px;
  flex-wrap: wrap;
  > b {
    margin: 0 3px;
  }
`;

export const TaxSavings = styled.div`
  background-color: rgb(48, 132, 6, 0.1);
  padding: 8px;
  border-radius: 8px;
  color: rgb(48, 132, 6);
  margin-top: 20px;
  font-family: Calibre, sans-serif;
`;

export const TaxImportant = styled.span`
  font-family: Calibre-Semibold, sans-serif;
`;

export const TaxLink = styled(Link.Text)`
  cursor: pointer;
  color: rgb(48, 132, 6);
  font-family: Calibre-Semibold, sans-serif;
`;
