import { Button } from '@vroom-web/ui-lib';
import styled from 'styled-components';

export const SubmitButton = styled(Button.Primary)`
  margin-top: 32px;
  :disabled {
    color: #ffffff;
  }
  @media (max-width: 1020px) {
    margin-top: 20px;
    width: 100%;
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  > :first-child {
    margin-top: 5px;
  }
`;
