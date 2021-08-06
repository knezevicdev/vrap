import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Form, Formik } from 'formik';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import OptionsViewModel from './ViewModel';

import CheckByMail from 'src/components/CheckByMail';
import PayOptions from 'src/components/PayOptions';
import { Button } from 'src/core/Button';
import Icon, { Icons } from 'src/core/Icon';
import { Body, Hero, Title } from 'src/core/Typography';
import { PaymentOverviewFormValues } from 'src/interfaces.d';
import DirectDeposit from 'src/modules/directdeposit';

const FormContainer = styled(Form)`
  display: flex;
  height: 100%;
  flex-direction: column;
  background-color: #ffffff;
  margin-right: 20px;
  @media (max-width: 1280px) {
    width: 100%;
    margin: 0;
  }
`;

const OptionsContainer = styled.div`
  background: white;
  margin: 0 20px;
  padding: 30px 80px;
  width: 864px;

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
  margin: 32px 0;
  font-weight: 800;
  font-size: 48px;
  line-height: 48px;
  letter-spacing: 1px;
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
  isPrimaryAddress: 'Yes',
  address: '',
  apartment: '',
  city: '',
  state: '',
  zipcode: '',
};

const OptionsView: React.FC<Props> = ({ viewModel }) => {
  useEffect(() => {
    viewModel.onPageLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const PaymentOverviewSchema = Yup.object().shape({
    paymentOption: Yup.string().required('Required'),
    routingNumber: Yup.string().when('paymentOption', {
      is: 'Direct Deposit',
      then: Yup.string()
        .required('Field is required')
        .test(
          'valid-routing-number',
          'Please enter a valid routing number',
          (value) => {
            return viewModel.isValidRouting(value);
          }
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
    isPrimaryAddress: Yup.string().when('paymentOption', {
      is: 'Check by Mail',
      then: Yup.string().required('Field is required'),
    }),
    address: Yup.string().when('isPrimaryAddress', {
      is: 'No',
      then: Yup.string()
        .required('Field is required')
        .test(
          'valid-street-address',
          'Please enter a valid street address',
          (value) => {
            return viewModel.isValidStreetAddress(value);
          }
        ),
    }),
    apartment: Yup.string().when('isPrimaryAddress', {
      is: 'No',
      then: Yup.string(),
    }),
    city: Yup.string().when('isPrimaryAddress', {
      is: 'No',
      then: Yup.string()
        .required('Field is required')
        .test('valid-city', 'Please enter a valid city', (value) => {
          return viewModel.isValidName(value);
        }),
    }),
    state: Yup.string().when('isPrimaryAddress', {
      is: 'No',
      then: Yup.string().required('Field is required'),
    }),
    zipcode: Yup.string().when('isPrimaryAddress', {
      is: 'No',
      then: Yup.string()
        .required('Field is required')
        .test('valid-zip-code', 'Please enter a valid zip code', (value) => {
          return viewModel.isValidZipCode(value);
        }),
    }),
  });

  const shouldShowSubmitButton = viewModel.getShowSubmitButton();
  const isPlaidSubmitting = viewModel.getPlaidSubmitting();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), { noSsr: false });

  return (
    <Formik
      initialValues={InitialValues}
      validationSchema={PaymentOverviewSchema}
      onSubmit={(
        values: PaymentOverviewFormValues,
        { setSubmitting }
      ): void => {
        setSubmitting(true);
        viewModel.paymentOptionsSubmit(values);
      }}
      validateOnMount={true}
    >
      {({ isValid, values, isSubmitting, setFieldValue }): JSX.Element => {
        const showDirectDeposit = viewModel.showDirectDeposit();
        const showSubmitButton =
          shouldShowSubmitButton ||
          !showDirectDeposit ||
          viewModel.getInstitutionNotFound();

        return (
          <FormContainer>
            {isDesktop && <StyledHero>{viewModel.hero}</StyledHero>}
            <OptionsContainer>
              <PayOptions selected={values.paymentOption} />

              <OptionDisplay>
                {showDirectDeposit ? (
                  <DirectDeposit />
                ) : (
                  <CheckByMail
                    mailingAddress={viewModel.getMailiingAddress()}
                    isPrimaryAddress={values.isPrimaryAddress}
                    setFieldValue={setFieldValue}
                    state={values.state}
                  />
                )}
              </OptionDisplay>

              {showSubmitButton && (
                <SubmitButton
                  type="submit"
                  disabled={!isValid || isSubmitting || isPlaidSubmitting}
                >
                  {isSubmitting ? viewModel.submitting : viewModel.submit}
                </SubmitButton>
              )}
            </OptionsContainer>
          </FormContainer>
        );
      }}
    </Formik>
  );
};

export default observer(OptionsView);
