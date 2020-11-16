import { Form, Formik } from 'formik';
import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import CheckByMail from 'src/components/CheckByMail';
import DirectDeposit from 'src/components/DirectDeposit';
import PayOptions from 'src/components/PayOptions';
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
  height: 100%;

  @media (max-width: 1280px) {
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

const isValidRouting = async (routingNumberToTest: string): Promise<boolean> => {
  if (!routingNumberToTest) { //all 0's is technically a valid routing number, but it's inactive
    return false;
  }

  let routing = routingNumberToTest.toString();
  while (routing.length < 9) {
    routing = '0' + routing; //I refuse to import left-pad for this
  }

  //gotta be 9  digits
  let match = routing.match("^\\d{9}$");
  if (!match) {
    return false;
  }

  //The first two digits of the nine digit RTN must be in the ranges 00 through 12, 21 through 32, 61 through 72, or 80.
  //https://en.wikipedia.org/wiki/Routing_transit_number
  const firstTwo = parseInt(routing.substring(0, 2));
  const firstTwoValid =  (0 <= firstTwo && firstTwo <= 12)
                      || (21 <= firstTwo && firstTwo <= 32)
                      || (61 <= firstTwo && firstTwo <= 72)
                      || firstTwo === 80;
  if (!firstTwoValid) {
    return false;
  }

  //this is the checksum
  //http://www.siccolo.com/Articles/SQLScripts/how-to-create-sql-to-calculate-routing-check-digit.html
  const weights = [3, 7 ,1];
  let sum = 0;
  for (var i=0 ; i<8; i++) {
    sum += parseInt(routing[i]) * weights[i % 3];
  }

  return (10 - (sum % 10)) % 10 === parseInt(routing[8]);
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
      {({ isValid, values, errors }): JSX.Element => {
        const showDirectDeposit = values.paymentOption === 'Direct Deposit';
        console.log({ values });
        console.log({ errors });
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
