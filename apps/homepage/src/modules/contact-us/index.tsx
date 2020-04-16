import { styled } from '@material-ui/core/styles';
import React from 'react';

import ContactOptions from './components/ContactOptions';

import PoweredByFooter from 'src/components/footer/PoweredByFooter';
import PoweredByHeader from 'src/components/header/PoweredByHeader';

const FillWindowHeight = styled('div')(() => ({
  flex: '1 1 auto',
  display: 'flex',
  flexDirection: 'column',
}));

const ContactUs: React.FC = () => {
  return (
    <>
      <PoweredByHeader />
      <FillWindowHeight>
        <ContactOptions />
      </FillWindowHeight>
      <PoweredByFooter />
    </>
  );
};

export default ContactUs;
