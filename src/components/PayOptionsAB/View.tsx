import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import CheckByMail from '../CheckByMailAB';
import ViewModel from './ViewModel';

import DirectDeposit from 'src/components/DirectDepositAB';
import Icon, { Icons } from 'src/core/Icon';
import RadioButton from 'src/core/Radio';
import { Body, Title } from 'src/core/Typography';
import { MailingAddress } from 'src/interfaces.d';

export interface Props {
  selected: string;
  viewModel: ViewModel;
  mailingAddress: MailingAddress;
  isPrimaryAddress: string;
  setFieldValue: (field: string, value: string) => void;
  state: string;
  instituteNotFound: boolean;
}

const PayOptionsView: React.FC<Props> = (props) => {
  const {
    selected,
    viewModel,
    mailingAddress,
    isPrimaryAddress,
    setFieldValue,
    state,
    instituteNotFound,
  } = props;

  return (
    <PayOptionsContainer>
      <OptionContainer
        selected={selected === 'Direct Deposit'}
        key={'Direct Deposit'}
      >
        <RadioButton
          checked={selected === 'Direct Deposit'}
          disabled={false}
          name={'paymentOption'}
          value={'Direct Deposit'}
          onClick={viewModel.onPayOptionClick}
          type={'circle'}
        >
          <Label>Direct Deposit</Label>
          <Description>Sign in using your exiting back login</Description>
          <BodyContainer>
            <SectionContainer>
              <SectionTitle>
                <Icon icon={Icons.CALENDAR} /> Get your money faster
              </SectionTitle>
              <span>Customers who use Plaid receive their money sooner</span>
            </SectionContainer>
            <SectionContainer>
              <SectionTitle>
                <Icon icon={Icons.PEOPLE} /> Most popular method
              </SectionTitle>
              <span>
                <strong>Over 60%</strong> of Vroom customers choose to get paid
                through Plaid
              </span>
            </SectionContainer>
            <SectionContainer>
              <SectionTitle>
                <Icon icon={Icons.SECURE_LOCK} /> Most secure method
              </SectionTitle>
              <span>
                Plaid is <strong>trusted worldwide</strong> for transfering
                funds
              </span>
            </SectionContainer>
          </BodyContainer>
          <LogoContainer>
            Powered by <Icon icon={Icons.PLAID_LOGO_GRAY} />
          </LogoContainer>
        </RadioButton>
      </OptionContainer>

      {instituteNotFound && selected === 'Direct Deposit' && (
        <OptionContainer selected={true}>
          <RadioButton
            name={''}
            checked={true}
            disabled={false}
            value={'Manual Input'}
            type={'circle'}
          >
            <Label>Enter your bank information manually</Label>
            <DirectDeposit />
          </RadioButton>
        </OptionContainer>
      )}
      <OptionContainer
        selected={selected === 'Check by Mail'}
        key={'Check by Mail'}
      >
        <RadioButton
          checked={selected === 'Check by Mail'}
          disabled={false}
          name={'paymentOption'}
          value={'Check by Mail'}
          onClick={viewModel.onPayOptionClick}
          type={'circle'}
        >
          <Label>Check By Mail</Label>
          <OptionDescription>{viewModel.checkByMailDesc}</OptionDescription>
          {selected === 'Check by Mail' && (
            <CheckByMail
              mailingAddress={mailingAddress}
              isPrimaryAddress={isPrimaryAddress}
              setFieldValue={setFieldValue}
              state={state}
            />
          )}
        </RadioButton>
      </OptionContainer>
    </PayOptionsContainer>
  );
};

const PayOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 420px) {
    flex-direction: column;
  }
`;

const OptionContainer = styled.div<{ selected?: boolean }>`
  width: 60%;
  padding: 20px;
  border: ${({ selected }): string => (selected ? '' : '1px solid #D6D7DA')};
  box-sizing: border-box;
  box-shadow: ${({ selected }): string =>
    selected ? '0px 4px 24px 4px rgba(0, 0, 0, 0.1)' : ''};
  height: fit-content;
  margin-bottom: 16px;
  :last-child {
    margin-bottom: 0;
  }

  :first-child {
    border-top: 4px solid #1960d0;
  }
  @media (max-width: 1280px) {
    width: 100%;
  }
`;

const CheckItem = styled.div`
  font-weight: 300;
  padding: 5px 0;
`;

const Label = styled(Title.One)`
  display: flex;
  margin-bottom: 8px;
`;

const Description = styled.div`
  font-family: Calibre;
  margin-bottom: 32px;
  font-size: 18px;
  line-height: 24px;
`;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  span {
    margin-left: 32px;
    font-family: Calibre;
    font-size: 18px;
    line-height: 24px;
  }
`;

const SectionTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: Calibre;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #1960d0;
  margin-bottom: 4px;
  img {
    margin-right: 8px;
  }
`;

const SectionContainer = styled(BodyContainer)`
  margin-bottom: 16px;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 20px;
  color: #999da3;
  padding-right: 28px;
  img {
    margin-left: 4px;
  }
`;

const ManualContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const OptionDescription = styled(Body.Regular)``;

export default observer(PayOptionsView);
