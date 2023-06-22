import { Button, Icon, Typography } from '@vroom-web/ui-lib';
import styled from 'styled-components';

export const Preview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const PreviewSubtitle = styled.p`
  margin: 0;
`;

export const PayOptionsContainer = styled.div`
  display: flex;

  @media (max-width: 420px) {
    flex-direction: column;
  }
`;

export const OptionContainer = styled.div`
  padding: 20px;
  height: fit-content;

  @media (max-width: 420px) {
    width: 100%;
  }
`;

export const PlaidIconWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 5px;
`;

export const CheckItem = styled.div`
  font-weight: 300;
  padding: 5px 0;
`;

export const Label = styled.div`
  display: flex;
`;

export const StyledPlaidButton = styled(Button.Primary)`
  display: flex;
  justify-content: center;
  margin: 15px 0;
  padding: 13px 20px;
  white-space: normal;
  width: 50%;

  @media (max-width: 420px) {
    width: 100%;
    justify-content: center;
  }
`;

export const LockText = styled(Typography.Body.Small)`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 50%;

  @media (max-width: 420px) {
    width: 100%;
  }
`;

export const StyledIcon = styled(Icon)`
  margin: 0 5px;
`;
