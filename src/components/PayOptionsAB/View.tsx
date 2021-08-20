import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
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

  const [initialNotFound, changeNotFound] = useState(true);

  useEffect(() => {
    if (initialNotFound && instituteNotFound) {
      changeNotFound(false);
    }
  }, [instituteNotFound]);

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
          <Label>{viewModel.directDeposit}</Label>
          <Description>{viewModel.singinDesc}</Description>
          <BodyContainer>
            <SectionContainer>
              <SectionTitle>
                <Icon icon={Icons.CALENDAR} /> {viewModel.getMoneyFaster}
              </SectionTitle>
              <BodyText>{viewModel.plaidBenefitFaster}</BodyText>
            </SectionContainer>
            <SectionContainer>
              <SectionTitle>
                <Icon icon={Icons.PEOPLE} /> {viewModel.mostPopularMethod}
              </SectionTitle>
              <BodyText>
                <EmphasizeText>{viewModel.overSixty}</EmphasizeText>{' '}
                {viewModel.paymentPreference}
              </BodyText>
            </SectionContainer>
            <SectionContainer>
              <SectionTitle>
                <Icon icon={Icons.SECURE_LOCK} /> {viewModel.mostSecureMethod}
              </SectionTitle>
              <BodyText>
                {viewModel.plaidIs}
                <EmphasizeText>{viewModel.worldwide}</EmphasizeText>
                {viewModel.transferingFund}
              </BodyText>
            </SectionContainer>
          </BodyContainer>
          <LogoContainer>
            {viewModel.poweredBy} <Icon icon={Icons.PLAID_LOGO_GRAY} />
          </LogoContainer>
        </RadioButton>
      </OptionContainer>

      {instituteNotFound && (
        <OptionContainer
          selected={selected === 'Manual Input'}
          key={'Manual Input'}
          className={instituteNotFound ? '' : 'hide'}
        >
          <RadioButton
            checked={selected === 'Manual Input'}
            disabled={false}
            name={'paymentOption'}
            value={'Manual Input'}
            onClick={viewModel.onPayOptionClick}
            type={'circle'}
          >
            <Label className={'short-width'}>
              {viewModel.enterBankInfoManual}
            </Label>
            {selected === 'Manual Input' && <DirectDeposit />}
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
          <Label>{viewModel.checkByMail}</Label>
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

const Label = styled(Title.One)`
  display: flex;
  margin-bottom: 8px;
  font-weight: 600;
  &.short-width {
    width: 80%;
  }
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

const BodyText = styled.span`
  margin-left: 32px;
  font-family: Calibre;
  font-size: 18px;
  width: 70%;
  font-weight: 400;
  line-height: 24px;
`;

const EmphasizeText = styled(BodyText)`
  font-weight: 600;
  margin: 0;
`;

const OptionDescription = styled(Body.Regular)``;

export default observer(PayOptionsView);
