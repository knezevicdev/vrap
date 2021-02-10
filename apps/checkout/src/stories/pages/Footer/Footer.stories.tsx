import React from 'react';

import Footer from 'src/modules/footer/View';
import ViewModel from 'src/modules/footer/ViewModel';

const links = [
  {
    id: 'privacy',
    text: 'Privacy',
    href: '/legal/privacy-policy',
  },
  {
    id: 'terms',
    text: 'Terms',
    href: '/legal/terms-of-use',
  },
  {
    id: 'contact',
    text: 'Contact',
    href: '/contact',
  },
];

const copyRight = `© ${new Date().getFullYear()} VROOM. ALL RIGHTS RESERVED`;

export const Default = (): JSX.Element => {
  const viewModel = {
    links,
    copyRight,
    trackLink: (label: string) => {
      console.log(`Tracking ...., ${label}`);
    },
  } as ViewModel;

  return <Footer viewModel={viewModel} />;
};

export default {
  title: 'Checkout/Footer',
};
