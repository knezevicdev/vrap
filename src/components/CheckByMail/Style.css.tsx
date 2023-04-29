import { Typography } from '@vroom-web/ui-lib';
import styled from 'styled-components';

import FormikInput from '../../core/FormikInput';

export const CBMContainer = styled.div`
  width: 100%;
`;

export const CBMMessage = styled(Typography.Body.Regular)`
  display: flex;
  padding: 25px 0 10px;
`;

export const CBMMailingAddress = styled(Typography.Body.Regular)`
  display: flex;
  flex-direction: column;
  padding-bottom: 5px;
`;

export const AddressLine = styled.span`
  display: flex;
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    display: block;
    margin-bottom: 0;
  }
`;

export const ZipStateContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    display: block;
    margin-bottom: 0;
  }

  @media (max-width: 420px) {
    display: flex;
    width: 100%;
  }
`;

export const Address = styled(FormikInput)`
  width: 50%;
  margin-right: 10px;

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 16px;
  }
`;

export const Apartment = styled(FormikInput)`
  width: 50%;
  margin-left: 10px;

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    margin-bottom: 16px;
  }
`;

export const City = styled(FormikInput)`
  width: 50%;
  margin-right: 10px;

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 16px;
  }
`;

export const State = styled.div`
  button {
    border: 1px solid #d6d7da;
  }

  @media (max-width: 768px) {
    button {
      width: 70%;
    }
    width: 50%;
  }
`;

export const Zip = styled(FormikInput)`
  width: 50%;
  margin-left: 10px;

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    margin-bottom: 16px;
  }

  @media (max-width: 768px) {
    width: 50%;
    margin-left: 16px;
  }
`;

export const OptionContainer = styled.div<{ selected?: boolean }>`
  width: 25%;
  @media (max-width: 420px) {
    width: 100%;
  }
`;
