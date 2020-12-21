import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import Footer from '../Navigation/Footer/Footer';
import { FooterProps } from '../Navigation/Footer/types';

export default {
  title: 'Design System/Elements/Navigation/Footer',
} as Meta;

const sections = [
  {
    title: 'Vroom',
    links: [
      {
        href: '/cars',
        name: 'Buy',
      },
      {
        href: '/sell',
        name: 'Sell/Trade',
      },
      {
        href: '/finance',
        name: 'Finance',
      },
    ],
  },
  {
    title: 'About',
    links: [
      {
        href: '/about',
        name: 'About Us',
      },
      {
        href: '/protection',
        name: 'Vroom Protection',
      },
      {
        href: '/how-it-works',
        name: 'How It Works',
      },
      {
        href: '/reviews',
        name: 'Customer Reviews',
      },
      {
        href: 'https://ir.vroom.com/',
        name: 'Investor Relations',
      },
    ],
  },
  {
    title: 'Contact',
    links: [
      {
        href: 'tel:+18555241300',
        name: '(855) 524-1300',
      },
      {
        href: 'https://vroom.zendesk.com/hc/en-us',
        name: 'FAQ',
      },
      {
        href: '/contact',
        name: 'Contact Us',
      },
    ],
  },
  {
    title: 'Company',
    links: [
      {
        href: '/legal/privacy-policy',
        name: 'Privacy Policy',
      },
      {
        href: '/legal/terms-of-use',
        name: 'Terms of use',
      },
      {
        href: '/careers',
        name: 'Careers',
      },
      {
        href:
          'https://privacyportal.onetrust.com/webform/8086730d-99f7-48ea-b3a1-0b3bb0cf163e/aa3e2126-7439-411d-a9a2-9fa0c4f8b01d',
        name: 'Do Not Sell My Info (CA Residents)',
      },
    ],
  },
];

const viewModel: FooterProps = { sections: sections };

export const Default: Story = () => {
  return <Footer {...viewModel} />;
};

Default.parameters = {
  design: {
    type: 'figma',
    url:
      'https://www.figma.com/file/YuFZHgGp9QMb5yof3UmKYY/Vroom-Design-Library-2.0?node-id=114%3A0',
  },
};
