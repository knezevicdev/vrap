import { Form, Formik } from 'formik';
import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import OptionsViewModel from './ViewModel';

import CheckByMail from 'src/components/CheckByMail';
import DirectDeposit from 'src/components/DirectDeposit';
import PayOptions from 'src/components/PayOptions';
import { Button } from 'src/core/Button';
import Icon, { Icons } from 'src/core/Icon';
import { Body, Hero, Title } from 'src/core/Typography';
import { PaymentOverviewFormValues } from 'src/interfaces.d';

const FormContainer = styled(Form)`
  display: flex;
  height: 100%;

  @media (max-width: 1280px) {
    width: 100%;
  }
`;

const OptionsContainer = styled.div`
  background: white;
  border: 1px solid #e0e0e0;
  margin: 0 20px;
  padding: 30px 100px;
  box-shadow: 0px 0px 4px #e0e0e0;

  @media (max-width: 1280px) {
    margin: 20px;
    padding: 30px 55px;
    width: 100%;
  }

  @media (max-width: 420px) {
    margin: 0;
    padding: 20px;
    box-shadow: none;
  }
`;

const StyledHero = styled(Hero.Three)`
  padding: 0 35px 0 0;
  text-align: center;
`;

const Line = styled.hr`
  margin: 30px 0 20px;
`;

const OptionsTitle = styled(Title.Three)`
  font-weight: 600;
  display: flex;
`;

const OptionsBody = styled(Body.Regular)`
  display: flex;
  padding: 15px 0;
`;

const OptionDisplay = styled.div`
  min-width: 573px;

  @media (max-width: 420px) {
    min-width: 100%;
  }
`;

const OptionTitleIcon = styled(Icon)`
  margin: auto 10px auto 0;
`;

const SubmitButton = styled(Button.Primary)`
  margin: 15px 0 30px;
  max-width: 180px;
  white-space: normal;
  width: 100%;

  @media (max-width: 420px) {
    max-width: 100%;
  }
`;

export interface Props {
  viewModel: OptionsViewModel;
}

const InitialValues: PaymentOverviewFormValues = {
  paymentOption: 'Direct Deposit',
  routingNumber: '',
  bankAccountNumber: '',
};

const OptionsView: React.FC<Props> = ({ viewModel }) => {
  const PaymentOverviewSchema = Yup.object().shape({
    paymentOption: Yup.string().required('Required'),
    routingNumber: Yup.string().when('paymentOption', {
      is: 'Direct Deposit',
      then: Yup.string()
        .required('Field is required')
        .test(
          'valid-routing-num',
          'Please enter a valid routing number',
          viewModel.isValidRouting
        ),
    }),
    bankAccountNumber: Yup.string().when('paymentOption', {
      is: 'Direct Deposit',
      then: Yup.string()
        .required('Field is required')
        .matches(
          /^[a-zA-Z0-9]{4,17}$/,
          'Please enter a valid account number without spaces or hyphens'
        ),
    }),
  });

  return (
    <Formik
      initialValues={InitialValues}
      validationSchema={PaymentOverviewSchema}
      onSubmit={(values: PaymentOverviewFormValues): void => {
        viewModel.paymentOptionsSubmit(values);
      }}
      validateOnMount={true}
    >
      {({ isValid, values }): JSX.Element => {
        const showDirectDeposit = values.paymentOption === 'Direct Deposit';
        return (
          <FormContainer>
            <OptionsContainer>
              <StyledHero>{viewModel.hero}</StyledHero>
              <Line />
              <OptionsTitle>
                <OptionTitleIcon icon={Icons.RED_ONE} />
                {viewModel.optionTitle}
              </OptionsTitle>
              <OptionsBody>{viewModel.optionQuestion}</OptionsBody>
              <PayOptions
                optionMeta={viewModel.getPayOptionArray()}
                selected={values.paymentOption}
              />
              <OptionDisplay>
                {showDirectDeposit ? (
                  <DirectDeposit />
                ) : (
                  <CheckByMail
                    mailingAddress={viewModel.getMailiingAddress()}
                  />
                )}
              </OptionDisplay>
              <SubmitButton disabled={!isValid}>
                {viewModel.submit}
              </SubmitButton>
            </OptionsContainer>
          </FormContainer>
        );
      }}
    </Formik>
  );
};

export default observer(OptionsView);
