import { NextPage } from 'next';
import React from 'react';

import Page from 'src/components/Page';
import ContactUs from 'src/modules/contact-us';

interface Props {
  title: string;
  description: string;
}

const ContactUsPage: NextPage<Props> = ({ title, description }) => {
  const head = (
    <>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
    </>
  );
  return (
    <Page name="Contact Us" head={head}>
      <ContactUs />
    </Page>
  );
};

ContactUsPage.getInitialProps = async (): Promise<Props> => {
  const title = 'Contact Us - Rocket Auto';
  const description = 'Get in touch with Rocket Auto at 1-800-338-5240';
  return { title, description };
};

export default ContactUsPage;
