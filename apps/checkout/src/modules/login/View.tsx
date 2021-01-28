import {
    Body,
    Heading,
    Link,
    ThemeProps,
  } from '@vroom-web/temp-ui-alias-for-checkout';
  import { Formik, FormikProps } from 'formik';
  import React, { ReactElement } from 'react';
  import styled from 'styled-components';
  
  import LoginForm from './LoginForm';
  import { FormValues } from './types';
  import { ValidationSchema } from './validationSchema';
  import LoginViewModel from './ViewModel';
  
  interface Props {
    viewModel: LoginViewModel;
  }
  
  const Container = styled.div`
    padding: 40px;
  `;
  
  const Title = styled(Heading.Three)`
    text-align: center;
  `;
  
  const LoginText = styled(Body.Small)`
    display: block;
    text-align: center;
  `;
  
  const primaryBrand = (props: { theme: ThemeProps }): string =>
    props.theme.colors.primary.brand;
  
  const CustomLink = styled(Link)`
    font-size: inherit;
    color: ${primaryBrand};
    text-decoration: none;
  `;
  
  const LoginView: React.FC<Props> = ({ viewModel }) => {
    const { initValues, title, handleSubmit, register } = viewModel;
    return (
      <Container>
        <Title>{title}</Title>
        <Formik
          initialValues={initValues}
          validationSchema={ValidationSchema}
          onSubmit={handleSubmit}
        >
          {(props: FormikProps<FormValues>): ReactElement => (
            <LoginForm {...props} />
          )}
        </Formik>
        <LoginText>
          {register.initialText}{' '}
          <CustomLink href={register.href}>{register.text}</CustomLink>
        </LoginText>
      </Container>
    );
  };
  
  export default LoginView;
  