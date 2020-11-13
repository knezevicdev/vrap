import { Form, Formik } from 'formik';
import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import CheckByMail from '../../components/CheckByMail';
import DirectDeposit from '../../components/DirectDeposit';
import PayOptions from '../../components/PayOptions';
import OptionsViewModel from './ViewModel';

import { Button } from 'src/core/Button';
import Icon, { Icons } from 'src/core/Icon';
import { Body, Hero, Title } from 'src/core/Typography';

const OptionsContainer = styled.div`
  background: white;
  border: 1px solid #e0e0e0;
  margin: 0 20px;
  padding: 30px 100px;
  box-shadow: 0px 0px 4px #e0e0e0;

  @media (max-width: 786px) {
    margin: 20px;
    padding: 30px 60px;
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

const isValidRouting = async (n: string): Promise<boolean> => {
  if (!n) return false;

  const formulaVal =
    (3 *
      (Number(n[0]) +
        Number(n[5]) +
        Number(n[8]) +
        7 * (Number(n[3]) + Number(n[6]) + Number(n[9])) +
        3 * (Number(n[4]) + Number(n[7]) + Number(n[10])))) %
    10;
  const t = parseInt(n.slice(0, 2));
  const between = (x: number, min: number, max: number): boolean => {
    return x >= min && x <= max;
  };
  if (
    n.length === 9 &&
    formulaVal === 0 &&
    (between(t, 0, 12) || between(t, 21, 32) || between(t, 61, 72) || t === 80)
  ) {
    return true;
  } else {
    return false;
  }
};

const PaymentOverviewSchema = Yup.object().shape({
  paymentOption: Yup.string().required('Required'),
  routingNumber: Yup.string().when('paymentOption', {
    is: 'Direct Deposit',
    then: Yup.string()
      .required('Field is required')
      .test(
        'valid-routing-num',
        'Please enter a valid routing number',
        isValidRouting
      ),
  }),
  bankAccountNumber: Yup.string().when('paymentOption', {
    is: 'Direct Deposit',
    then: Yup.string()
      .required('Field is required')
      .matches(/^[\w\d]{4,17}$/, 'Please enter a valid account number'),
  }),
});

interface PaymentOverviewFormValues {
  paymentOption: string;
  routingNumber: string;
  bankAccountNumber: string;
}

const InitialValues: PaymentOverviewFormValues = {
  paymentOption: 'Direct Deposit',
  routingNumber: '',
  bankAccountNumber: '',
};

const OptionsView: React.FC<Props> = ({ viewModel }) => {
  return (
    <Formik
      initialValues={InitialValues}
      validationSchema={PaymentOverviewSchema}
      onSubmit={(values: PaymentOverviewFormValues): void => {
        console.log({ values });
      }}
      validateOnMount={true}
    >
      {({ isValid, values }): JSX.Element => {
        const showDirectDeposit = values.paymentOption === 'Direct Deposit';
        return (
          <Form>
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
              <OptionsBody>{viewModel.bankInfo}</OptionsBody>
              {showDirectDeposit ? <DirectDeposit /> : <CheckByMail />}
              <SubmitButton disabled={!isValid}>
                {viewModel.submit}
              </SubmitButton>
            </OptionsContainer>
          </Form>
        );
      }}
    </Formik>
  );
};

export default observer(OptionsView);
