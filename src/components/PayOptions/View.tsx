import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import CheckByMail from '../CheckByMailAB';
import ViewModel from './ViewModel';

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
}

const PayOptionsView: React.FC<Props> = (props) => {
  const {
    selected,
    viewModel,
    mailingAddress,
    isPrimaryAddress,
    setFieldValue,
    state,
  } = props;

  const radioOptions = viewModel.optionMeta.map((option) => {
    const checked = selected === option;
    let child = (
      <div>
        <Label>{option}</Label>
        <OptionDescription>{viewModel.checkByMailDesc}</OptionDescription>
        {selected !== 'Direct Deposit' && (
          <CheckByMail
            mailingAddress={mailingAddress}
            isPrimaryAddress={isPrimaryAddress}
            setFieldValue={setFieldValue}
            state={state}
          />
        )}
      </div>
    );
    if (option === 'Direct Deposit') {
      child = (
        <>
          {/* <Label>
            Direct Deposit with <Icon icon={Icons.PLAID_LOGO} />
          </Label>
          <CheckItem>
            <Icon icon={Icons.CHECK_MARK_GREEN} /> Faster than check by mail
          </CheckItem>
          <CheckItem>
            <Icon icon={Icons.CHECK_MARK_GREEN} /> Most secure way to transfer
            funds
          </CheckItem> */}
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
        </>
      );
    }

    return (
      <OptionContainer selected={checked} key={option}>
        <RadioButton
          checked={checked}
          disabled={false}
          name={'paymentOption'}
          value={option}
          onClick={viewModel.onPayOptionClick}
          type={'circle'}
        >
          {child}
        </RadioButton>
      </OptionContainer>
    );
  });

  return <PayOptionsContainer>{radioOptions}</PayOptionsContainer>;
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
  :first-child {
    margin-bottom: 16px;
    border-top: 4px solid #1960d0;
  }
  @media (max-width: 420px) {
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

const OptionDescription = styled(Body.Regular)``;

export default observer(PayOptionsView);
