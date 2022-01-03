import { useRouter } from 'next/router';
import React from 'react';

import LicenseStateInput from './LicenseStateInput';
import ViewModel from './ViewModel';

import { useAppStore } from 'src/context';

const LicenseToVin: React.FC = () => {
  const { store } = useAppStore();
  const router = useRouter();

  const viewModel = new ViewModel(store, router);

  return <LicenseStateInput viewModel={viewModel} />;
};

export default LicenseToVin;
